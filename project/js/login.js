Vue.createApp({
    data(){
        return{
            account: '',
            password: '',
            eye: true,
            is_bigchar: '',
        }
    },

    methods:{

        send_UserForm(){
            console.log(this.account);

        },

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

    },

    moubted(){
    }
}).mount('#login');