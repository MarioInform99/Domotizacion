import React, {createContext,Component} from 'react';
import axios from 'axios';
export  const MyContext=createContext();
 //Creating an instance
//You can create a new instance of axios with a custom config.
// const GOOGLE_BUTTON_ID='188480538697-fhn5jrsulrnngn5sjs80ol354ul48bfd';
export default class ContextClass extends Component{
    constructor(){
        super();
        this.loginIn();
    }

    state={
        LoginView:true,
        isAuth:false,
        rolAdmin:false,
        theUser:null
    };

    toggleNav =()=>{
        const LoginView=!this.state.LoginView;
        this.setState({
            ...this.state, //Clonamos el objeto
            LoginView   
        });
        //LoginView:LoginView
    }

    logoutUser=()=>{
        localStorage.removeItem('loginToken');
        this.setState({
            ...this.state,
                isAuth:false
        });
    }

    // registerUser=async(user)=>{
    //     //await es usado para computaciones asíncronas
    //     //solo funciona cuando 
    //     const register=await axios.post('/registrer.php',{
    //         nombre:user.nombre,
    //         apellidos:user.apellidos,
    //         correo:user.correo,
    //         password:user.password,
    //         fechaNacimiento:user.fechaNacimiento
    //     });
    //     return register.data;
    // }

    // loginUser=async(user)=>{
        
    //     const login= axios.post('http://localhost/Domotizacion/raspb/config/login.php',{
    //         correo:user.correo,
    //         password:user.password
    //     })
    //     .then(res=>console.log(res))
    //     .catch(err=>console.log(err));
    //     console.log(login.data);
    //     return login.data;
    // }

    loginIn=async (role)=>{
        
        const loginToken=localStorage.getItem('loginToken');
        if(loginToken){

            let loginIntest=await fetch('http://localhost/Domotizacion/API/userInfo.php',{
                method:'POST',
                headers:{
                    Authorization:`Bearer ${loginToken}`
                }
            })
            .then((response)=>response.json())
            .then((responseJSON)=>{
              return responseJSON;
            });
            console.log(loginIntest);
            if(loginIntest.exito && loginIntest.user){
                this.setState({
                    ...this.state,
                    isAuth:true,
                    rolAdmin:loginIntest.rol,
                    theUser:loginIntest.user
                });
                console.log(this.state);
            }
        }
        
    }

    render(){
        const valuesContext={
            rootState:this.state,
            toggleNav :this.toggleNav ,
            logoutUser:this.logoutUser,
            registerUser:this.registerUser,
            loginUser:this.loginUser,
            loginIn:this.loginIn
        }
        return(<MyContext.Provider value={valuesContext}>{this.props.children}</MyContext.Provider>);
    }

}