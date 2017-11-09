//JSON OBJECT---------------------------------------------------------------------------------------------

var data = [
	 {
			 tagName: 'div',
			 className: 'test-class',
			 styles: {
					 width: "100px",
					 height: "100px",
					 backgroundColor: 'red'
			 },
			 children: [
					 {
							 tagName: 'div',
							 className: 'box',
							 styles: {
									 width: "50px",
									 height: "50px",
									 backgroundColor: 'blue'
							 },
					 },
					 {
							 tagName: 'div',
							 className: 'box',
							 styles: {
									 width: "50px",
									 height: "50px",
									 backgroundColor: 'brown',
									 float: 'right'
							 },
					 },
					 
			 ]
	 }
];



var body=document.getElementsByTagName("body")[0];
var objKeys=Object.keys(data[0]);

for(var i=0;i<data.length;i++){
	jsonToHtml(data[i]);
}


//Converting JSON to HTML----------------------------------------------------------------------------
function jsonToHtml(jsonObject){
	var parent=constructElement(jsonObject);
	for(var i=0;i<jsonObject.children.length;i++){
		console.log(i);
		var children=constructElement(jsonObject.children[i]);
		parent.appendChild(children);
	}
	body.appendChild(parent);
}

function constructElement(element){
	var newElement=document.createElement(element.tagName);
	newElement.setAttribute("class",element.className);
	for(styleKey in element.styles){
		newElement.style[styleKey]=element.styles[styleKey];
	}
	return newElement;
}

