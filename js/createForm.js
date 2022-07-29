
Vue.createApp({  
    
    data(){
        return{
            alertMessage: '',  // 成功訊息
            successMessage: '',  // 錯誤訊息
            name:'',  // 表單姓名欄位
            phone:'',  // 表單電話欄位
            remark:'',  // 表單備註欄位
            
        };        
    },
    methods: {
        
        // 驗證創建user表單的資料
        // 將輸入資料用spilt切割，判斷長度與空值
        validate(){
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
        // onclick送出表單事件
        // 最優先呼叫validate()驗證使用者輸入是否符合規則
        // 送出後清空表單
        sendForm(){    
            if(this.validate()){
                axios           
                    .post('create.php',{
                        name: this.name,
                        phone: this.phone,
                        remark: this.remark,
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
            this.name = '';
            this.phone = '';
            this.remark = '';
        },        
    },
    mounted(){  
          
    }
}).mount('#Form');