Vue.createApp({
    data(){
        return{ 
            
            // debug mode
            debug_status: true,

            phone_isnum: /(^\d+)/,  

            // 創建表單
            Create_Success_Message: '',  // 錯誤訊息
            Create_Alert_Message: '',  // 成功訊息            
            Create_name:'',  // 表單姓名欄位
            Create_phone:'',  // 表單電話欄位
            Create_remark:'',  // 表單備註欄位

            // 編輯表單
            Edit_Success_Message:'',  // 成功訊息
            Edit_Alert_Message:'',  // 錯誤訊息
            allselected:false,  // 預設全選按鈕狀態        
            selectid: [],  // 存被選中checkbox的id
            users:[],  // 資料庫中所有的user

            // 搜尋欄
            query:'', //存放使用者輸入搜尋欄位的關鍵字
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
                        if(this.debug_status){
                            console.log('目前JSON檔所有人',this.users);   
                            console.log('--------------分隔線-----------------');
                        }                                       
                    })
                    .catch(error => {
                        console.log('錯誤:',error); 
                    })                
        },

        // 驗證create表單的資料
        // 將輸入資料用spilt切割，判斷長度與空值
        validate(){

            // 驗證電話規則
            // 正則表達式(regex)，/**/ 等同於 new RegExp()，是js內建函數，用來比對符合自訂規則的文字
            // \d代表只能包含0~9
            // phone_isnum = /(^\d+)/;  

            checkName = this.Create_name.split('');
            checkPhone = this.Create_phone.split('');
            checkRemark = this.Create_remark.split('');
            
            if(checkName.length == 0) {
                this.Create_Success_Message = '';
                this.Create_Alert_Message = '姓名是必填欄位';
                return false;
            }
            else if(checkPhone.length == 0){
                this.Create_Success_Message = '';
                this.Create_Alert_Message = '電話是必填欄位';
                return false
            }
            else if(checkName.length > 5){
                this.Create_Success_Message = '';
                this.Create_Alert_Message = '姓名不得超過5個字元';
                return false
            }
            else if(checkPhone.length > 10){
                this.Create_Success_Message = '';
                this.Create_Alert_Message = '電話不得超過10個字元';
                return false
            }
            else if(!this.phone_isnum.test(checkPhone)){
                this.Create_Success_Message = '';
                this.Create_Alert_Message = '電話欄位請輸入數字';
                return false
            }
            else{
                this.Create_Success_Message = '已送出';
                this.Create_Alert_Message = '';
                return true;                
            }
        },

        // onclick送出表單事件
        // 最優先呼叫validate()驗證使用者輸入是否符合規則
        // 送出後清空表單、清空搜尋欄、nodata變成false
        sendForm(){    
            if(this.validate()){
                axios           
                    .post('create.php',{
                        name: this.Create_name,
                        phone: this.Create_phone,
                        remark: this.Create_remark,
                    })                
                        .then(response => {     
                            this.getAllUserList();
                            this.query = '';
                            this.nodata = false;
                            if(this.debug_status){
                                console.log('送出表單狀態為',response.statusText);
                            }                            
                        })
                        .catch(error => {
                            console.log(error);
                        }) 
                        this.clearForm();
            }
        },

        // 清空表單
        clearForm(){
            this.Create_name = '';
            this.Create_phone = '';
            this.Create_remark = '';
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
                        if(this.debug_status){
                            console.log('姓名已編輯');                      
                            console.log('事件為',event.type);  
                        }                                          
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
            else if(!this.phone_isnum.test(checkPhone)){
                this.Edit_Success_Message = '';
                this.Edit_Alert_Message = '電話欄位請輸入數字';
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
                        if(this.debug_status){
                            console.log('電話已編輯');                      
                            console.log('事件為',event.type);  
                        }                 
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
                        if(this.debug_status){
                            console.log('備註已編輯');                      
                            console.log('事件為',event.type); 
                        }               
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
                        if(this.debug_status){
                            console.log('已刪除的資料庫ID為',id)
                        }                                                                            
                    })
                    .catch(error => {
                        console.log('錯誤:',error); 
                    })      
        },

        // 全選checkbox
        // 預設allselected為false
        // 先將selectid[]清空
        // for迴圈將目前所有checkbox id放進暫存的selectid[]，形成迴圈。[1],[2],[3]
        selectAll(){
            if(!this.allselected){
                this.selectid = []; 
                for(i=0;i<this.users.length;i++){
                    this.selectid.push(this.users[i].id);                                          
                };
                if(this.deleteUser){
                    console.log('已選取checkbox的資料庫ID為',this.selectid); 
                }        
            }else{
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
                            if(this.debug_status){
                                console.log('已刪除的資料庫ID為',this.selectid); 
                            }                             
                            this.selectid = [];
                            this.query = '';                                           
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