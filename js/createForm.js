
Vue.createApp({
    data(){
        return{            
            // name: '',
            // phone: '',
            // remark: ''            
        }       
    },
    methods: {
        sendForm(){       
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
        },
        clearForm(){
            this.name = '';
            this.phone = '';
            this.remark = '';
        }
    },
    mounted(){  
          
    }
}).mount('#Form');