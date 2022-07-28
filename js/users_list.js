Vue.createApp({
    data(){
        return{
            foo:[], //暫存
            allselected:false, //預設全選按鈕狀態        
            selectid: [],   //擺放被選中框框的id
            users:[] //資料庫中所有的user
        };
    },
    methods:{
        // 前端去json檔取得所有使用者資料，
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

        // 驗證編輯的資料
        validate(status){
            checkName = this.name.split('');
            checkPhone = this.phone.split('');
            checkRemark = this.remark.split('');
            
            if(checkName.length == 0) {
                this.successMessage = '';
                this.alertMessage = '姓名是必填欄位';
                return false;
            }
            else if(checkPhone.length == 0){
                this.successMessage = '';
                this.alertMessage = '電話是必填欄位';
                return false
            }
            else if(checkName.length > 5){
                this.successMessage = '';
                this.alertMessage = '姓名不得超過5個字元';
                return false
            }
            else if(checkPhone.length > 10){
                this.successMessage = '';
                this.alertMessage = '電話不得超過10個字元';
                return false
            }
            else{
                this.successMessage = '已送出';
                this.alertMessage = '';
                return true;                
            }
        },

        // change***都是對使用者進行編輯
        // status存放改變的欄位，丟給php進行switch判斷
        // event.target.value 指向被change的對象的值
        changeName(user,event){
            axios
                .post('editUser.php',{
                    status: "name",
                    id: user.id,
                    name: event.target.value,
                })
                    .then(response => {                    
                        console.log(event);                  
                    })
                    .catch(error => {
                        console.log('錯誤:',error); 
                    })
        },
        changePhone(user,event){
            axios
                .post('editUser.php',{
                    status: "phone",
                    id: user.id,
                    phone: event.target.value,
                })
                    .then(response => {                    
                        console.log(event);                   
                    })
                    .catch(error => {
                        console.log('錯誤:',error); 
                    })
        },
        changeRemark(user,event){
            axios
                .post('editUser.php',{
                    status: "remark",
                    id: user.id,
                    remark: event.target.value,
                })
                    .then(response => {                    
                        console.log(event);                 
                    })
                    .catch(error => {
                        console.log('錯誤:',error); 
                    })
            },

        // 取得目標id後，post到php進行刪除，並且產生新的json檔
        deleteUser(id){
            axios                
                .post('deleteUser.php',{id})
                    .then(response => {                      
                        this.getAllUserList()                                                    
                    })
                    .catch(error => {
                        console.log('錯誤:',error); 
                    })      
        },

        //全選
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
                        // this.selectid.length = 0;
                        console.log(this.selectid)                                                
                    })
                    .catch(error => {
                        console.log('錯誤:',error); 
                    })
            }                     
        },
    },
    mounted(){        
        this.getAllUserList();
    },
}).mount('#users')