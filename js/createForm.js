
Vue.createApp({
    data(){
        return{  
            name:'',
            phone:'',
            remark:'',
            alertMessage: [],
            successMessage: '', 
        };        
    },
    methods: {
        // 驗證創建user表單的資料
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
        sendForm(){
            if(this.validate(this.status)){
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
        clearForm(){
            this.name = '';
            this.phone = '';
            this.remark = '';
        },        
    },
    mounted(){  
          
    }
}).mount('#Form');