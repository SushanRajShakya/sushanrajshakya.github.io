//division---------------------------------------------------------------------------------------------

var mainWrapper=document.getElementById("main-wrapper");
mainWrapper.style.backgroundColor="darkkhaki";
mainWrapper.style.width="1000px";
mainWrapper.style.height="400px";
mainWrapper.style.position="relative";



//Random number generator------------------------------------------------------------------------
function getRandomNumber(max,min){
	return Math.floor(Math.random()*(max-min+1))+min;
}


//OOP-------------------------------------------------------------------------------------------

function Box(item){
	//defining moving box
	this.element=item;

	//defining co-ordinates and directions
	this.x=getRandomNumber(980,0);
	this.y=getRandomNumber(380,0);
	this.dx=2;
	this.dy=2;

	this.updatePosition=function(){
		this.check();
		this.x=this.x+this.dx;
		this.y=this.y+this.dy;
		this.element.style.top= this.y+"px";
		this.element.style.left= this.x+"px";
	}


	this.check=function(){
		if(this.x+boxWidth>=maxWidth){
			this.dx=-3;
		}else if (this.x<=0){
			this.dx=3;
		}

		if(this.y+boxHeight>=maxHeight){
			this.dy=-3;
		}else if (this.y<=0){
			this.dy=3;
		}
	}

}


//creating moving box------------------------------------------------------------------------





var newBox=[];
for(var i=0;i<10;i++){
	var box=document.createElement("div");
	box.style.width="30px";
	box.style.height="17px";
	box.setAttribute("id","id"+[i]);
	box.style.backgroundImage="url('ant.png')";
	box.style.backgroundSize="contain;"
	box.style.backgroundReperat="none";
	box.style.position="absolute";

	mainWrapper.appendChild(box);
	

	newBox.push(new Box(box));
	box.onclick=function(_newBox){
		return function(){
			clickedBox=_newBox;
			clickedBox.element.style.backgroundImage="url('dead-ant.png')";
			clickedBox.dx=0;
			clickedBox.dy=0;
		}
	}(newBox[i]);
}


//total width of all elements-----------------------------------------------------------------
var boxWidth=parseInt(box.style.getPropertyValue("width"));
var boxHeight=parseInt(box.style.getPropertyValue("height"));
var maxWidth=parseInt(mainWrapper.style.getPropertyValue("width"));
var maxHeight=parseInt(mainWrapper.style.getPropertyValue("height"));

//Interval function-------------------------------------------------------------------------
setInterval(function(){
	for(var i=0;i<10;i++){
		newBox[i].updatePosition();
	}
},50);




/*
//Moving BOX Code
document.onkeydown = function(event) {
	if(event.keyCode==37){
		newBox.change("left");
	}else if (event.keyCode==39) {
		newBox.change("right");
	}else if(event.keyCode==40){
		newBox.change("top");
	}else if(event.keyCode==38){
		newBox.change("bottom");
	}
};

//Event key
document.onkeydown = function(event) {
    console.log(event.keyCode);
};
37 39 38 40
*/
