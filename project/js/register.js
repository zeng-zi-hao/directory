Vue.createApp({
    data(){
        return{
            is_num: /^[0-9]*$/,
            is_mail: /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/,
            is_word: /^[\u4e00-\u9fa5_a-zA-Z0-9]+$/,

            success_message: '',
            error_message: '',

            register_name: '',
            register_phone: '',
            register_mail: '',
            register_password: '',
            register_confirm_password: '',
            eye: true,
            is_bigchar: '',
        }
    },

    methods:{
        showpassword(){
            this.eye=false;
        },
        hidepassword(){
            this.eye=true;
        },
        bigchar(){
            if(event.getModifierState( 'CapsLock' )){
                this.is_bigchar = true;           
            }
            else{
                this.is_bigchar = false;
            }
        },
        
        validate(){
            checkname = this.register_name.split('');
            checkphone = this.register_phone.split('');
            checkmail = this.register_mail.split('');
            checkpassword = this.register_password.split('');
            check_confirm_password = this.register_confirm_password.split('');

            if(checkname.length == 0){
                this.success_message = '';
                this.error_message = '姓名不能為空';
            }
            else if(checkname.length > 5){
                this.success_message = '';
                this.error_message = '姓名不能超過5個字';
            }
            else if(!this.is_word.test(this.register_name)){
                this.success_message = '';
                this.error_message = '姓名欄位請物輸入特殊字';
            }            
            else if(checkphone.length == 0){
                this.success_message = '';
                this.error_message = '電話不能為空';
            }
            else if(checkphone.length > 10){
                this.success_message = '';
                this.error_message = '電話不能超過10個字';
            }
            else if(!this.is_num.test(this.register_phone)){
                this.success_message = '';
                this.error_message = '電話欄位請輸入數字';
            }  
            else if(checkmail.length == 0){
                this.success_message = '';
                this.error_message = '信箱不能為空';
            }
            else if(!this.is_mail.test(this.register_mail)){
                this.success_message = '';
                this.error_message = '信箱格式不正確';
            }
            else if(checkpassword.length == 0){
                this.success_message = '';
                this.error_message = '密碼不能為空';
            }
            else if(this.register_password != this.register_confirm_password){
                this.success_message = '';
                this.error_message = '密碼與確認密碼不一致';
            } 
            else{
                this.success_message = '註冊成功'
                this.error_message = '';
            }
        },

        send_RegisterForm(){
            this.validate();
            if(this.validate){
                axios
                .post('../func/register.php',{
                    register_name: this.register_name,
                    register_phone: this.register_phone,
                    register_mail: this.register_mail,
                    register_password: this.register_password,
                    register_confirm_password: this.register_confirm_password,
                })
                    .then(response => {
                        this.clearForm();
                    })
                    .catch(response =>{
                        console.log(response);
                    })  
            }
            else{
                this.error_message = "註冊傳送失敗";
                this.clearForm();
            }
        
        },

        clearForm(){
            this.Create_name = '';
            this.Create_phone = '';
            this.Create_remark = '';
        },
    },

    moubted(){
    }
}).mount('#register');