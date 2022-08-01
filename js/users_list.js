Vue.createApp({
    data(){
        return{
            Edit_Success_Message:'',  // 成功訊息
            Edit_Alert_Message:'',  // 錯誤訊息
            foo:[],  // 共用暫存陣列
            allselected:false,  // 預設全選按鈕狀態        
            selectid: [],  // 存被選中checkbox的id
            users:[],  // 資料庫中所有的user
            query:'',
            nodata: false,
        };
    },
    methods:{
        // 前端去json檔取得所有使用者資料
        getAllUserList(){
            axios
                .get('json/data.json')  
                    .then(response => {                    
                        this.users = response.data.result;
                        // console.log(response); 
                        console.log(this.users);                  
                    })
                    .catch(error => {
                        console.log('錯誤:',error); 
                    })                
        },

        // @change事件
        // change***都是對使用者進行編輯
        // status存放改變的欄位，丟給php進行switch判斷
        // event.target.value 指向被change的對象的值
        // 驗證使用者輸入，規則與create相同
        // 送出後清除搜索欄(query)
        changeName(user,event){
            checkName = event.target.value;
            if(checkName.length == 0) {
                this.Edit_Success_Message = '';
                this.Edit_Alert_Message = '姓名是必填欄位';
                event.target.value = user.name;  // 發生錯誤後，返回上一個正確的數值
            }
            else if(checkName.length > 5){
                this.Edit_Success_Message = '';
                this.Edit_Alert_Message = '姓名不得超過5個字元';
                event.target.value = user.name;  // 發生錯誤後，返回上一個正確的數值
            }
            else{
                axios
                .post('editUser.php',{
                    status: "name",
                    id: user.id,
                    name: event.target.value,
                })
                    .then(response => {
                        this.getAllUserList()
                        this.Edit_Success_Message = '姓名已編輯';
                        this.Edit_Alert_Message = '';
                        this.query = '';                    
                        console.log(event);                  
                    })
                    .catch(error => {
                        console.log('錯誤:',error); 
                    })
            }
            
        },
        changePhone(user,event){
            checkPhone = event.target.value;
            if(checkPhone.length == 0){
                this.Edit_Success_Message = '';
                this.Edit_Alert_Message = '電話是必填欄位';
                event.target.value = user.phone;  // 發生錯誤後，返回上一個正確的數值
            }
            else if(checkPhone.length > 10){
                this.Edit_Success_Message = '';
                this.Edit_Alert_Message = '電話不得超過10個字元';
                event.target.value = user.phone;  // 發生錯誤後，返回上一個正確的數值
            }
            else{
                axios
                .post('editUser.php',{
                    status: "phone",
                    id: user.id,
                    phone: event.target.value,
                })
                    .then(response => {  
                        this.getAllUserList()
                        this.Edit_Success_Message = '電話已編輯';
                        this.Edit_Alert_Message = '';
                        this.query = '';                   
                        console.log(event);                   
                    })
                    .catch(error => {
                        console.log('錯誤:',error); 
                    })
            }
            
        },
        changeRemark(user,event){
            axios
                .post('editUser.php',{
                    status: "remark",
                    id: user.id,
                    remark: event.target.value,
                })
                    .then(response => {
                        this.getAllUserList()
                        this.Edit_Success_Message = '備註已編輯';
                        this.Edit_Alert_Message = '';
                        this.query = '';                     
                        console.log(event);                 
                    })
                    .catch(error => {
                        console.log('錯誤:',error); 
                    })
        },

        // @onclick事件
        // 取得目標id後，post到php進行刪除，並且產生新的json檔
        // 刪除後清除搜索欄(query)
        deleteUser(id){
            axios                
                .post('deleteUser.php',{id})
                    .then(response => {                      
                        this.getAllUserList()
                        this.query = '';                                                    
                    })
                    .catch(error => {
                        console.log('錯誤:',error); 
                    })      
        },

        // 全選checkbox
        // 預設allselected為false
        // 先將foo[]與selectid[]清空
        // for迴圈將目前所有checkbox id放進暫存的foo[]，形成巢狀迴圈。[1],[2],[3]
        // selectid 存放只用flat()將foo[]攤平的陣列。[1,2,3]
        selectAll(){
            if(!this.allselected){
                this.foo = [];
                this.selectid = []; 
                for(i=0;i<this.users.length;i++){
                    this.foo.push(this.users[i].id);     
                    this.selectid = this.foo.flat();                   
                };                 
            }else{
                this.foo = [];
                this.selectid = [];                
            }                          
        },

        // @onclick事件，刪除全部cheack id
        // 用for迴圈將selectid[]的值一個個丟到deleteUser.php進行刪除
        multidelete(){
            for(i=0;i<this.selectid.length;i++){
                axios 
                    .post('deleteUser.php',{
                        id: this.selectid[i]
                    })
                        .then(response => {                      
                            this.getAllUserList();
                            this.allselected = false;
                            this.foo = [];
                            this.selectid = [];
                            this.query = ''; 
                            console.log(this.selectid)                                                
                        })
                        .catch(error => {
                            console.log('錯誤:',error); 
                        })
            }                     
        },

        // @keyup事件，監視鍵盤操作事件
        // query為使用者目前輸入的值
        // nodata為布林，存放判斷使用者輸入是否存在於列表當中的狀態
        // post到query.php進行sql的全表搜索，並回傳json的陣列
        // 有進行html字元的編碼與解碼
        fetchData(){
            this.nodata = false;
            if(this.query != ''){
                axios
                    .post('query.php',{
                        query: this.query
                    })
                        .then(response => {
                            this.users = response.data.result;
                            if(response.data.indexOf('null') > 0){
                                this.users = [];
                                this.nodata = true;
                            }
                            else {
                                this.users = response.data.result;
                            }                 
                        })
                        .catch(error => { 
                            console.log('錯誤:',error);
                        })
            }
            else{
                this.getAllUserList();
            }
		}
    },
    mounted(){        
        this.getAllUserList();
    },
}).mount('#users')