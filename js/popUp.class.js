class PopUp{
    text;
    popUpContainer;
    content;
    distanceTop;
    distanceRight;
    
    constructor(string,distanceTop,distanceRight){
        this.text=string;
        this.distanceTop=distanceTop;
        this.distanceRight=distanceRight;
       
        
    }

    createPopUp(){
       this.popUpContainer= document.createElement('div');
      this.popUpContainer.classList.add('pop-up');

      this.popUpContainer.style.top=this.distanceTop;
      this.popUpContainer.style.right=this.distanceRight;
     
     //  this.content= document.createTextNode(`${this.text}`);
     //  this.popUpContainer.appendChild(this.content);
       document.body.appendChild(this.popUpContainer);
      
       // this.popUpContainer.classList.add('pop-up-animation');
     
        
     this.phase1();
     this.phase2();
     this.phase3();

   

   



    }

    phase1() {
        setTimeout(()=>{
            this.popUpContainer.classList.add('pop-up-animation');
        },2000);
    }

    phase2(){
        setTimeout(()=>{
            this.content= document.createTextNode(`${this.text}`);
            this.popUpContainer.appendChild(this.content);
        },3000);
    }

    phase3(){
        setTimeout(()=>{
            this.popUpContainer.classList.remove('pop-up-animation');
            this.popUpContainer.removeChild(this.content);
        },6000);
    
        setTimeout(()=>{
            this.popUpContainer.classList.add('hide');
        },6500);
    }

}