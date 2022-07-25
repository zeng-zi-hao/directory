
Vue.createApp({
    data(){
        return{
            users: {
                name: '',
                phone: '',
                remark: ''
            }
        };        
    },
    methods: {
        sendForm(){        
            axios
                .post('create.php',{
                    name: this.users.name,
                    phone: this.users.phone,
                    remark: this.users.remark,
                })
                .then(function(response){
                    console.log(response);
                })
                .catch(function(error){
                    console.log(error);
                }) 
            this.clearForm();    
        },
        clearForm(){
            this.users.name = "";
            this.users.phone = "";
            this.users.remark = "";
        }
    },
    mounted(){  
              
    }
}).mount('#app');