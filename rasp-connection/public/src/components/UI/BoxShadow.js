
export default class BoxShadow extends React.Component{
    constructor(props){
        super(props);
        this.idBox=0;
        this.created=React.createElement;
        this.title="";
    }
    setTitle(title){
        this.title=title;
    }
    getTitleRender(){
        return this.created('h4',{className:"titulo"},this.title);
    }

    getCheckbox(){
        const id=this.idBox++;
        console.log(id);
        // type="checkbox" class="button" name="boton" id="boton"/>
        const inputChec=this.created('input',{className:"button",id:`boton${id}`, name:"boton",type:"checkbox"},);
        const labelChec=this.created('label',{htmlFor:`boton${id}`,className:"button_label"},"");
        const elemts=[inputChec,labelChec];
        const divContainerCheckbox=this.created('div',{className:"containerButton"},elemts);
        return divContainerCheckbox;
    }

    render(){
        const title=this.getTitleRender();
        const button=this.getCheckbox();
        const elemts=[title,button];
        const divContainer=this.created('div',{className:"containerBox",id:(this.idBox++)},elemts);
        return divContainer;
    }
}