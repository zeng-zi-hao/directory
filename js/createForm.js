
Vue.createApp({  
    
    data(){
        return{

            
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
        

                
    },
    mounted(){  
          
    }
}).mount('#Form');