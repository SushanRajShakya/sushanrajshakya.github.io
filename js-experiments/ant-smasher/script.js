//division---------------------------------------------------------------------------------------------
var mainWrapper=document.getElementById("main-wrapper");
mainWrapper.style.backgroundColor="darkkhaki";
mainWrapper.style.width="1000px";
mainWrapper.style.height="500px";
mainWrapper.style.overflow="hidden";
mainWrapper.style.display="none";

function World(){
//game menu start----------------------------------------------------------------------------------------------
	this.gameMenuWrapper=document.createElement("div");
	this.gameMenuWrapper.style.backgroundColor="red";
	this.gameMenuWrapper.style.width="100%";
	this.gameMenuWrapper.style.height="500px";
	this.gameMenuWrapper.style.fontSize="5em";
	this.gameMenuWrapper.style.fontWeight="bold";
	this.gameMenuWrapper.style.display="block";
	this.gameMenuWrapper.style.textAlign="center";
	this.gameMenuWrapper.innerHTML="Ant Smasher!<br><br>-----Smash'em all-----<br>"
	document.body.appendChild(this.gameMenuWrapper);

	var startBtn=document.createElement("button");
	startBtn.style.borderRadius="5px";
	startBtn.style.padding="20px";
	startBtn.style.fontSize="20px";
	startBtn.style.value="Start";
	startBtn.innerHTML="Start";
	this.gameMenuWrapper.appendChild(startBtn);


	//game over division--------------------------------------------------------------------------------------------
	this.gameOverWrapper=document.createElement("div");
	this.gameOverWrapper.style.backgroundColor="red";
	this.gameOverWrapper.style.width="100%";
	this.gameOverWrapper.style.height="500px";
	this.gameOverWrapper.style.fontSize="5em";
	this.gameOverWrapper.style.fontWeight="bold";
	this.gameOverWrapper.style.display="none";
	this.gameOverWrapper.style.textAlign="center";
	this.gameOverWrapper.innerHTML="Congratulations!<br><br>You have killed all the ants<br>"
	document.body.appendChild(this.gameOverWrapper);

	var playAgainBtn=document.createElement("button");
	playAgainBtn.style.borderRadius="5px";
	playAgainBtn.style.padding="20px";
	playAgainBtn.style.fontSize="20px";
	playAgainBtn.style.value="Play Again";
	playAgainBtn.innerHTML="Play Again";
	this.gameOverWrapper.appendChild(playAgainBtn);


	//Play Again button function----------------------------------------------------------------------
	playAgainBtn.onclick=function(){
		that.gameOverWrapper.style.display="none";
		that.gameMenuWrapper.style.display="block";
		mainWrapper.style.display="none";
	}


	//Start button function-----------------------------------------------------------------------
	startBtn.onclick=function(){
		that.gameMenuWrapper.style.display="none";
		that.gameOverWrapper.style.display="none";
		mainWrapper.style.display="block";
		that.start();
	}


	var that=this;
	//Start the game------------------------------------------------------------------------------
	var antGroup=[];

	this.start=function(){
		var dummyWrapper=document.createElement("div");
		dummyWrapper.style.width="100%";
		dummyWrapper.style.height="100%";
		dummyWrapper.style.position="relative";
		mainWrapper.appendChild(dummyWrapper);
		for(var i=0;i<10;i++){
			var box=document.createElement("div");
			box.style.width=boxWidth+"px";
			box.style.height=boxHeight+"px";
			//box.setAttribute("id","id"+[i]);
			box.style.backgroundImage="url('ant.png')";
			box.style.backgroundSize="contain;"
			box.style.backgroundReperat="none";
			box.style.position="absolute";

			dummyWrapper.appendChild(box);
			antGroup.push(new Ant(box));

		//total width of all elements-----------------------------------------------------------------

			box.onclick=function(selectedAnt){
				return function(){
					var clickedAnt=selectedAnt;
					clickedAnt.killAnt();
					antGroup.splice(antGroup.indexOf(selectedAnt),1);
					this.onclick=null;
				}
			}(antGroup[i]);
		}

		this.beginInterval(antGroup,dummyWrapper);

	//set interval-----------------------------------------------------------------------------
		/*
		var flag=setInterval(function(){
			for(var i=0;i<antGroup.length;i++){
				antGroup[i].updatePosition();
			}
			if(antGroup.length==0){
				clearInterval(flag);
				that.gameOverWrapper.style.display="block";
				mainWrapper.removeChild(dummyWrapper);
				mainWrapper.style.display="none";
			}
		},50);
		*/
	};

	this.beginInterval=function(tempGroup,dummyWrapper){
		var flag=setInterval(function(){
			for(var i=0;i<tempGroup.length;i++){
				tempGroup[i].updatePosition();
			}
			if(tempGroup.length==0){
				clearInterval(flag);
				that.gameOverWrapper.style.display="block";
				mainWrapper.removeChild(dummyWrapper);
				mainWrapper.style.display="none";
			}

			this.collisionDetection(tempGroup);

		},50);
	}

	this.collisionDetection(tempGroup){
		tempGroup.forEach(function firstAnt){
			tempGroup.forEach(function secondAnt){				
				if(firstAnt){

				}
			}
		}
	}
}

//total width of all elements-----------------------------------------------------------------
var boxWidth=30;
var boxHeight=17;
var maxWidth=parseInt(mainWrapper.style.getPropertyValue("width"));
var maxHeight=parseInt(mainWrapper.style.getPropertyValue("height"));


//Random number generator------------------------------------------------------------------------
function getRandomNumber(max,min){
	return Math.floor(Math.random()*(max-min+1))+min;
}


//OOP-------------------------------------------------------------------------------------------
function Ant(item){
	//defining moving box
	this.element=item;

	//defining co-ordinates and directions
	this.x=getRandomNumber(980,0);
	this.y=getRandomNumber(380,0);
	this.dx=getRandomNumber(3,-3);
	this.dy=getRandomNumber(3,-3);

	this.updatePosition=function(){
		this.check();
		this.x=this.x+this.dx;
		this.y=this.y+this.dy;
		this.element.style.top= this.y+"px";
		this.element.style.left= this.x+"px";
	}

	this.killAnt=function(){
		this.element.style.backgroundImage="url('dead-ant.png')";
		this.dx=0;
		this.dy=0;
	}

	this.check=function(){
		if(this.x+boxWidth>=maxWidth){
			this.dx=-this.dx;
		}else if (this.x<=0){
			this.dx=-this.dx;
		}

		if(this.y+boxHeight>=maxHeight){
			this.dy=-this.dy;
		}else if (this.y<=0){
			this.dy=-this.dy;
		}
	}

}

var createWorld=new World();


/*---------------------------------------------------------------------------------------------
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
