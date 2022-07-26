Vue.createApp({
    data(){
        return{
            selectid: [],
            users:[]
        }
    },
    methods:{
        getAllUserList(){
            axios
                .get('json/data.json')  
                    .then(response => {                    
                        this.users = response.data.result;
                        // console.log(response); 
                        console.log(this.users);                  
                    })
                    .catch(error => {
                        console.log(error);
                    })
                
        },
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
        selectAll(){
                    
        },
        multidelete(){
            for(i=0;i<this.selectid.length;i++){
                axios 
                .post('deleteUser.php',{
                    id: this.selectid[i]
                })
                    .then(response => {                      
                        this.getAllUserList();
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