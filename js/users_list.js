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
        editUser(id){
            axios                
                .post('edidUser.php',{id})
                    .then(response => {                      
                        this.getAllUserList()                                                    
                    })
                    .catch(error => {
                        console.log('錯誤:',error); 
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