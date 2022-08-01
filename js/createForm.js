
Vue.createApp({  
    
    data(){
        return{
            Create_Success_Message: '',  // 錯誤訊息
            Create_Alert_Message: '',  // 成功訊息            
            Create_name:'',  // 表單姓名欄位
            Create_phone:'',  // 表單電話欄位
            Create_remark:'',  // 表單備註欄位
            
        };        
    },
    methods: {
        
        // 驗證創建user表單的資料
        // 將輸入資料用spilt切割，判斷長度與空值
        validate(){
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
            else{
                this.Create_Success_Message = '已送出';
                this.Create_Alert_Message = '';
                return true;                
            }
        },
        // onclick送出表單事件
        // 最優先呼叫validate()驗證使用者輸入是否符合規則
        // 送出後清空表單
        sendForm(){    
            if(this.validate()){
                axios           
                    .post('create.php',{
                        name: this.Create_name,
                        phone: this.Create_phone,
                        remark: this.Create_remark,
                    })                
                        .then(response => {                            
                            console.log(response);
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
    },
    mounted(){  
          
    }
}).mount('#Form');