export default class Form {
  constructor() {
    this.id=0;
    this.ObjArray=[];
  }

  createTagForm(){
      const form=document.createElement('form');
      form.setAttribute('id',`formulario_${this.id++}`);
      form.setAttribute('action','');
      return form;
  }
  //Tag es la etiqueta que queremos crear, attribut le pasamos un formato JSON
  //que recorremos con map() para asinarlo dentro de la etiqueta
  //De momento no corregimos los elementos
  setTag(tag, attributs, content, idRender, obj) {
      this.ObjArray.push(obj);
        const form=this.createTagForm();
      console.log(form);
    const tagNew = document.createElement(tag);
    for (const [key, value] of Object.entries(attributs)) {
      tagNew.setAttribute(key, value);
    }
    console.log(tagNew);
    console.log(attributs);
    console.log(content);
    console.log(idRender);
        idRender.appendChild(form);
        form.appendChild(tagNew);
        console.log(idRender);
  }
  getObj(){
      console.log(this.ObjArray);
  }
}
