let dragValue;
let isDrag=false;
let isPuzzle=true;//пъзел ли е
let fromsqr;
let emptDiv=document.getElementById("emptyDiv");
let squares=document.querySelectorAll(".square");//+document.querySelectorAll(".Bsquare");
let ovrSqr;
let hasMoved=[];
let enPass=[];
let corrm={
	frm: [/*"",*/"a2","b7","b1","e7"],//ако си черените остави нулевия индекс празен (както съм го направил с коментара)
	to: [/*"",*/"a3","b6","c3","e5"],
};
let promotion=["","","","","","","","","","","","","","","",""];
let castleble=[true,true,true,true,true,true];
let WinPzl=false;
let winMoveForPzl=corrm.frm.length;
let move=1;// ако е пъзел 1-ти си белите, 2-ти си черните
for(let i=0;i<16;i++){
	hasMoved[i]=false;
	enPass[i]=-1;
}
function dragBking(){
 	let drpiece=document.getElementById("Bking");
 	//drpiece.style.position="relative";
  	drpiece.onmousedown=function(e){
		let x=e.pageX;
		let y=e.pageY;
		emptDiv.append(document.getElementById(drpiece.id));
		drpiece.style.left=(x-50)+"px";
		drpiece.style.top=(y-50)+"px";
		isDrag=true;
   		dragValue=drpiece;
 	}
}
function dragWking(){
	let drpiece=document.getElementById("Wking");
	//drpiece.style.position="relative";
	drpiece.onmousedown=function(e){
		let x=e.pageX;
		let y=e.pageY;
		emptDiv.append(document.getElementById(drpiece.id));
		drpiece.style.left=(x-50)+"px";
		drpiece.style.top=(y-50)+"px";
		isDrag=true;
		dragValue=drpiece;
	}
}
function dragBpawn1(){
	let drpiece=document.getElementById("Bpawn1");
	//drpiece.style.position="relative";
	 drpiece.onmousedown=function(e){
		let x=e.pageX;
		let y=e.pageY;
		emptDiv.append(document.getElementById(drpiece.id));
		drpiece.style.left=(x-50)+"px";
		drpiece.style.top=(y-50)+"px";
		isDrag=true;
		  dragValue=drpiece;
	}
}
function dragWpawn1(){
	let drpiece=document.getElementById("Wpawn1");
	//drpiece.style.position="relative";
	 drpiece.onmousedown=function(e){
		let x=e.pageX;
		let y=e.pageY;
		emptDiv.append(document.getElementById(drpiece.id));
		drpiece.style.left=(x-50)+"px";
		drpiece.style.top=(y-50)+"px";
		isDrag=true;
		  dragValue=drpiece;
	}
}
function dragBpawn2(){
	let drpiece=document.getElementById("Bpawn2");
	//drpiece.style.position="relative";
	 drpiece.onmousedown=function(e){
		let x=e.pageX;
		let y=e.pageY;
		emptDiv.append(document.getElementById(drpiece.id));
		drpiece.style.left=(x-50)+"px";
		drpiece.style.top=(y-50)+"px";
		isDrag=true;
		  dragValue=drpiece;
	}
}
function dragWpawn2(){
	let drpiece=document.getElementById("Wpawn2");
	//drpiece.style.position="relative";
	 drpiece.onmousedown=function(e){
		let x=e.pageX;
		let y=e.pageY;
		emptDiv.append(document.getElementById(drpiece.id));
		drpiece.style.left=(x-50)+"px";
		drpiece.style.top=(y-50)+"px";
		isDrag=true;
		  dragValue=drpiece;
	}
}
function dragBpawn3(){
	let drpiece=document.getElementById("Bpawn3");
	//drpiece.style.position="relative";
	 drpiece.onmousedown=function(e){
		let x=e.pageX;
		let y=e.pageY;
		emptDiv.append(document.getElementById(drpiece.id));
		drpiece.style.left=(x-50)+"px";
		drpiece.style.top=(y-50)+"px";
		isDrag=true;
		  dragValue=drpiece;
	}
}
function dragWpawn3(){
	let drpiece=document.getElementById("Wpawn3");
	//drpiece.style.position="relative";
	 drpiece.onmousedown=function(e){
		let x=e.pageX;
		let y=e.pageY;
		emptDiv.append(document.getElementById(drpiece.id));
		drpiece.style.left=(x-50)+"px";
		drpiece.style.top=(y-50)+"px";
		isDrag=true;
		  dragValue=drpiece;
	}
}
function dragBpawn4(){
	let drpiece=document.getElementById("Bpawn4");
	//drpiece.style.position="relative";
	 drpiece.onmousedown=function(e){
		let x=e.pageX;
		let y=e.pageY;
		emptDiv.append(document.getElementById(drpiece.id));
		drpiece.style.left=(x-50)+"px";
		drpiece.style.top=(y-50)+"px";
		isDrag=true;
		  dragValue=drpiece;
	}
}
function dragWpawn4(){
	let drpiece=document.getElementById("Wpawn4");
	//drpiece.style.position="relative";
	 drpiece.onmousedown=function(e){
		let x=e.pageX;
		let y=e.pageY;
		emptDiv.append(document.getElementById(drpiece.id));
		drpiece.style.left=(x-50)+"px";
		drpiece.style.top=(y-50)+"px";
		isDrag=true;
		  dragValue=drpiece;
	}
}
function dragBpawn5(){
	let drpiece=document.getElementById("Bpawn5");
	//drpiece.style.position="relative";
	 drpiece.onmousedown=function(e){
		let x=e.pageX;
		let y=e.pageY;
		emptDiv.append(document.getElementById(drpiece.id));
		drpiece.style.left=(x-50)+"px";
		drpiece.style.top=(y-50)+"px";
		isDrag=true;
		  dragValue=drpiece;
	}
}
function dragWpawn5(){
	let drpiece=document.getElementById("Wpawn5");
	//drpiece.style.position="relative";
	 drpiece.onmousedown=function(e){
		let x=e.pageX;
		let y=e.pageY;
		emptDiv.append(document.getElementById(drpiece.id));
		drpiece.style.left=(x-50)+"px";
		drpiece.style.top=(y-50)+"px";
		isDrag=true;
		  dragValue=drpiece;
	}
}
function dragBpawn6(){
	let drpiece=document.getElementById("Bpawn6");
	//drpiece.style.position="relative";
	 drpiece.onmousedown=function(e){
		let x=e.pageX;
		let y=e.pageY;
		emptDiv.append(document.getElementById(drpiece.id));
		drpiece.style.left=(x-50)+"px";
		drpiece.style.top=(y-50)+"px";
		isDrag=true;
		  dragValue=drpiece;
	}
}
function dragWpawn6(){
	let drpiece=document.getElementById("Wpawn6");
	//drpiece.style.position="relative";
	 drpiece.onmousedown=function(e){
		let x=e.pageX;
		let y=e.pageY;
		emptDiv.append(document.getElementById(drpiece.id));
		drpiece.style.left=(x-50)+"px";
		drpiece.style.top=(y-50)+"px";
		isDrag=true;
		  dragValue=drpiece;
	}
}
function dragBpawn7(){
	let drpiece=document.getElementById("Bpawn7");
	//drpiece.style.position="relative";
	 drpiece.onmousedown=function(e){
		let x=e.pageX;
		let y=e.pageY;
		emptDiv.append(document.getElementById(drpiece.id));
		drpiece.style.left=(x-50)+"px";
		drpiece.style.top=(y-50)+"px";
		isDrag=true;
		  dragValue=drpiece;
	}
}
function dragWpawn7(){
	let drpiece=document.getElementById("Wpawn7");
	//drpiece.style.position="relative";
	 drpiece.onmousedown=function(e){
		let x=e.pageX;
		let y=e.pageY;
		emptDiv.append(document.getElementById(drpiece.id));
		drpiece.style.left=(x-50)+"px";
		drpiece.style.top=(y-50)+"px";
		isDrag=true;
		  dragValue=drpiece;
	}
}
function dragBpawn8(){
	let drpiece=document.getElementById("Bpawn8");
	//drpiece.style.position="relative";
	 drpiece.onmousedown=function(e){
		let x=e.pageX;
		let y=e.pageY;
		emptDiv.append(document.getElementById(drpiece.id));
		drpiece.style.left=(x-50)+"px";
		drpiece.style.top=(y-50)+"px";
		isDrag=true;
		  dragValue=drpiece;
	}
}
function dragWpawn8(){
	let drpiece=document.getElementById("Wpawn8");
	//drpiece.style.position="relative";
	 drpiece.onmousedown=function(e){
		let x=e.pageX;
		let y=e.pageY;
		emptDiv.append(document.getElementById(drpiece.id));
		drpiece.style.left=(x-50)+"px";
		drpiece.style.top=(y-50)+"px";
		isDrag=true;
		  dragValue=drpiece;
	}
}
function dragBqueen(){
	let drpiece=document.getElementById("Bqueen");
	//drpiece.style.position="relative";
	 drpiece.onmousedown=function(e){
		let x=e.pageX;
		let y=e.pageY;
		emptDiv.append(document.getElementById(drpiece.id));
		drpiece.style.left=(x-50)+"px";
		drpiece.style.top=(y-50)+"px";
		isDrag=true;
		  dragValue=drpiece;
	}
}
function dragWqueen(){
	let drpiece=document.getElementById("Wqueen");
	//drpiece.style.position="relative";
	 drpiece.onmousedown=function(e){
		let x=e.pageX;
		let y=e.pageY;
		emptDiv.append(document.getElementById(drpiece.id));
		drpiece.style.left=(x-50)+"px";
		drpiece.style.top=(y-50)+"px";
		isDrag=true;
		  dragValue=drpiece;
	}
}
function dragBrook1(){
	let drpiece=document.getElementById("Brook1");
	//drpiece.style.position="relative";
	 drpiece.onmousedown=function(e){
		let x=e.pageX;
		let y=e.pageY;
		emptDiv.append(document.getElementById(drpiece.id));
		drpiece.style.left=(x-50)+"px";
		drpiece.style.top=(y-50)+"px";
		isDrag=true;
		  dragValue=drpiece;
	}
}
function dragWrook1(){
	let drpiece=document.getElementById("Wrook1");
	//drpiece.style.position="relative";
	 drpiece.onmousedown=function(e){
		let x=e.pageX;
		let y=e.pageY;
		emptDiv.append(document.getElementById(drpiece.id));
		drpiece.style.left=(x-50)+"px";
		drpiece.style.top=(y-50)+"px";
		isDrag=true;
		  dragValue=drpiece;
	}
}
function dragBrook2(){
	let drpiece=document.getElementById("Brook2");
	//drpiece.style.position="relative";
	 drpiece.onmousedown=function(e){
		let x=e.pageX;
		let y=e.pageY;
		emptDiv.append(document.getElementById(drpiece.id));
		drpiece.style.left=(x-50)+"px";
		drpiece.style.top=(y-50)+"px";
		isDrag=true;
		  dragValue=drpiece;
	}
}
function dragWrook2(){
	let drpiece=document.getElementById("Wrook2");
	//drpiece.style.position="relative";
	 drpiece.onmousedown=function(e){
		let x=e.pageX;
		let y=e.pageY;
		emptDiv.append(document.getElementById(drpiece.id));
		drpiece.style.left=(x-50)+"px";
		drpiece.style.top=(y-50)+"px";
		isDrag=true;
		  dragValue=drpiece;
	}
}
function dragBbishop1(){
	let drpiece=document.getElementById("Bbishop1");
	//drpiece.style.position="relative";
	 drpiece.onmousedown=function(e){
		let x=e.pageX;
		let y=e.pageY;
		emptDiv.append(document.getElementById(drpiece.id));
		drpiece.style.left=(x-50)+"px";
		drpiece.style.top=(y-50)+"px";
		isDrag=true;
		  dragValue=drpiece;
	}
}
function dragWbishop1(){
	let drpiece=document.getElementById("Wbishop1");
	//drpiece.style.position="relative";
	 drpiece.onmousedown=function(e){
		let x=e.pageX;
		let y=e.pageY;
		emptDiv.append(document.getElementById(drpiece.id));
		drpiece.style.left=(x-50)+"px";
		drpiece.style.top=(y-50)+"px";
		isDrag=true;
		  dragValue=drpiece;
	}
}
function dragBbishop2(){
	let drpiece=document.getElementById("Bbishop2");
	//drpiece.style.position="relative";
	 drpiece.onmousedown=function(e){
		let x=e.pageX;
		let y=e.pageY;
		emptDiv.append(document.getElementById(drpiece.id));
		drpiece.style.left=(x-50)+"px";
		drpiece.style.top=(y-50)+"px";
		isDrag=true;
		  dragValue=drpiece;
	}
}
function dragWbishop2(){
	let drpiece=document.getElementById("Wbishop2");
	//drpiece.style.position="relative";
	 drpiece.onmousedown=function(e){
		let x=e.pageX;
		let y=e.pageY;
		emptDiv.append(document.getElementById(drpiece.id));
		drpiece.style.left=(x-50)+"px";
		drpiece.style.top=(y-50)+"px";
		isDrag=true;
		  dragValue=drpiece;
	}
}
function dragBknight1(){
	let drpiece=document.getElementById("Bknight1");
	//drpiece.style.position="relative";
	 drpiece.onmousedown=function(e){
		let x=e.pageX;
		let y=e.pageY;
		emptDiv.append(document.getElementById(drpiece.id));
		drpiece.style.left=(x-50)+"px";
		drpiece.style.top=(y-50)+"px";
		isDrag=true;
		  dragValue=drpiece;
	}
}
function dragWknight1(){
	let drpiece=document.getElementById("Wknight1");
	//drpiece.style.position="relative";
	 drpiece.onmousedown=function(e){
		let x=e.pageX;
		let y=e.pageY;
		emptDiv.append(document.getElementById(drpiece.id));
		drpiece.style.left=(x-50)+"px";
		drpiece.style.top=(y-50)+"px";
		isDrag=true;
		  dragValue=drpiece;
	}
}
function dragBknight2(){
	let drpiece=document.getElementById("Bknight2");
	//drpiece.style.position="relative";
	 drpiece.onmousedown=function(e){
		let x=e.pageX;
		let y=e.pageY;
		emptDiv.append(document.getElementById(drpiece.id));
		drpiece.style.left=(x-50)+"px";
		drpiece.style.top=(y-50)+"px";
		isDrag=true;
		  dragValue=drpiece;
	}
}
function dragWknight2(){
	let drpiece=document.getElementById("Wknight2");
	//drpiece.style.position="relative";
	 drpiece.onmousedown=function(e){
		let x=e.pageX;
		let y=e.pageY;
		emptDiv.append(document.getElementById(drpiece.id));
		drpiece.style.left=(x-50)+"px";
		drpiece.style.top=(y-50)+"px";
		isDrag=true;
		  dragValue=drpiece;
	}
}

function take(sqr){
	let pcstr="";
	for(let i=0;(sqr.innerHTML[i]>="a" && sqr.innerHTML[i]<="z") || (sqr.innerHTML[i]>="A" && sqr.innerHTML[i]<="Z") || (sqr.innerHTML[i]>="0" && sqr.innerHTML[i]<="9");i++){
		pcstr=pcstr+sqr.innerHTML[i];
	}
	let pc=document.getElementById(pcstr);
	pc.style.left=-10000+"px";
	sqr.innerHTML="";
}

function canGo(tosqr){
	
	if(isPuzzle){
		if(fromsqr.id==corrm.frm[move-1] && tosqr.id==corrm.to[move-1]){
			if(move==winMoveForPzl){
				WinPzl=true;
			}
			return true;
		}else{
			return false;
		}
	}
	if(dragValue.id[0]=="W" && move%2==1){
		if(dragValue.id[1]=="p"){
			if(promotion[(parseInt(dragValue.id[5])-1)]!=""){
				if(promotion[(parseInt(dragValue.id[5])-1)]=="Wqueen"){
					if(tosqr.id[0]==fromsqr.id[0] && tosqr.id[1]!=fromsqr.id[1]){
						if(fromsqr.id[1]<tosqr.id[1]){
							for(let i=fromsqr.id.charCodeAt(1)+1;i<tosqr.id.charCodeAt(1);i++){
								let sq=document.getElementById(fromsqr.id[0]+String.fromCharCode(i));
								if(sq.innerHTML!=""){
									return false;
								}
							}
							if(tosqr.innerHTML[0]=="B"){
								take(tosqr);
								return true;
							}else if(tosqr.innerHTML==""){
								return true;
							}
							return false;
						}
						if(fromsqr.id[1]>tosqr.id[1]){
							for(let i=fromsqr.id.charCodeAt(1)-1;i>tosqr.id.charCodeAt(1);i=i-1){
								let sq=document.getElementById(fromsqr.id[0]+String.fromCharCode(i));
								if(sq.innerHTML!=""){
									return false;
								}
							}
							if(tosqr.innerHTML[0]=="B"){
								take(tosqr);
								return true;
							}else if(tosqr.innerHTML==""){
								return true;
							}
							return false;
						}
						console.log("broken");
						return false;
					}else if(tosqr.id[0]!=fromsqr.id[0] && tosqr.id[1]==fromsqr.id[1]){
						if(fromsqr.id[0]<tosqr.id[0]){
							for(let i=fromsqr.id.charCodeAt(0)+1;i<tosqr.id.charCodeAt(0);i++){
								let sq=document.getElementById(String.fromCharCode(i)+fromsqr.id[1]);
								if(sq.innerHTML!=""){
									return false;
								}
							}
							if(tosqr.innerHTML[0]=="B"){
								take(tosqr);
								return true;
							}else if(tosqr.innerHTML==""){
								return true;
							}
							return false;
						}
						if(fromsqr.id[0]>tosqr.id[0]){
							for(let i=fromsqr.id.charCodeAt(0)-1;i>tosqr.id.charCodeAt(0);i=i-1){
								let sq=document.getElementById(String.fromCharCode(i)+fromsqr.id[1]);
								if(sq.innerHTML!=""){
									return false;
								}
							}
							if(tosqr.innerHTML[0]=="B"){
								take(tosqr);
								return true;
							}else if(tosqr.innerHTML==""){
								return true;
							}
							return false;
						}
						console.log("broken");
						return false;
					}else if(Math.abs(tosqr.id.charCodeAt(0)-fromsqr.id.charCodeAt(0))==Math.abs(tosqr.id[1]-fromsqr.id[1]) && fromsqr!=tosqr){
						if(fromsqr.id[0]<tosqr.id[0] && fromsqr.id[1]<tosqr.id[1]){
							for(let i=fromsqr.id.charCodeAt(0)+1,j=fromsqr.id.charCodeAt(1)+1;i<tosqr.id.charCodeAt(0);i++,j++){
								let sq=document.getElementById(String.fromCharCode(i)+String.fromCharCode(j));
								if(sq.innerHTML!=""){
									return false;
								}
							}
							if(tosqr.innerHTML[0]=="B"){
								take(tosqr);
								return true;
							}else if(tosqr.innerHTML==""){
								return true;
							}
							return false;
						}
						if(fromsqr.id[0]>tosqr.id[0] && fromsqr.id[1]>tosqr.id[1]){
							for(let i=fromsqr.id.charCodeAt(0)-1,j=fromsqr.id.charCodeAt(1)-1;i>tosqr.id.charCodeAt(0);i=i-1,j=j-1){
								let sq=document.getElementById(String.fromCharCode(i)+String.fromCharCode(j));
								if(sq.innerHTML!=""){
									return false;
								}
							}
							if(tosqr.innerHTML[0]=="B"){
								take(tosqr);
								return true;
							}else if(tosqr.innerHTML==""){
								return true;
							}
							return false;
						}
						if(fromsqr.id[0]<tosqr.id[0] && fromsqr.id[1]>tosqr.id[1]){
							for(let i=fromsqr.id.charCodeAt(0)+1,j=fromsqr.id.charCodeAt(1)-1;i<tosqr.id.charCodeAt(0);i++,j=j-1){
								let sq=document.getElementById(String.fromCharCode(i)+String.fromCharCode(j));
								if(sq.innerHTML!=""){
									return false;
								}
							}
							if(tosqr.innerHTML[0]=="B"){
								take(tosqr);
								return true;
							}else if(tosqr.innerHTML==""){
								return true;
							}
							return false;
						}
						if(fromsqr.id[0]>tosqr.id[0] && fromsqr.id[1]<tosqr.id[1]){
							for(let i=fromsqr.id.charCodeAt(0)-1,j=fromsqr.id.charCodeAt(1)+1;i>tosqr.id.charCodeAt(0);i=i-1,j++){
								let sq=document.getElementById(String.fromCharCode(i)+String.fromCharCode(j));
								if(sq.innerHTML!=""){
									return false;
								}
							}
							if(tosqr.innerHTML[0]=="B"){
								take(tosqr);
								return true;
							}else if(tosqr.innerHTML==""){
								return true;
							}
							return false;
						}
						console.log("broken");
						return false;
					}
				}
				if(promotion[(parseInt(dragValue.id[5])-1)]=="Wrook"){
					if(tosqr.id[0]==fromsqr.id[0] && tosqr.id[1]!=fromsqr.id[1]){
						if(fromsqr.id[1]<tosqr.id[1]){
							for(let i=fromsqr.id.charCodeAt(1)+1;i<tosqr.id.charCodeAt(1);i++){
								let sq=document.getElementById(fromsqr.id[0]+String.fromCharCode(i));
								if(sq.innerHTML!=""){
									return false;
								}
							}
							if(tosqr.innerHTML[0]=="B"){
								take(tosqr);
								return true;
							}else if(tosqr.innerHTML==""){
								return true;
							}
							return false;
						}
						if(fromsqr.id[1]>tosqr.id[1]){
							for(let i=fromsqr.id.charCodeAt(1)-1;i>tosqr.id.charCodeAt(1);i=i-1){
								let sq=document.getElementById(fromsqr.id[0]+String.fromCharCode(i));
								if(sq.innerHTML!=""){
									return false;
								}
							}
							if(tosqr.innerHTML[0]=="B"){
								take(tosqr);
								return true;
							}else if(tosqr.innerHTML==""){
								return true;
							}
							return false;
						}
						console.log("broken");
						return false;
					}else if(tosqr.id[0]!=fromsqr.id[0] && tosqr.id[1]==fromsqr.id[1]){
						if(fromsqr.id[0]<tosqr.id[0]){
							for(let i=fromsqr.id.charCodeAt(0)+1;i<tosqr.id.charCodeAt(0);i++){
								let sq=document.getElementById(String.fromCharCode(i)+fromsqr.id[1]);
								if(sq.innerHTML!=""){
									return false;
								}
							}
							if(tosqr.innerHTML[0]=="B"){
								take(tosqr);
								return true;
							}else if(tosqr.innerHTML==""){
								return true;
							}
							return false;
						}
						if(fromsqr.id[0]>tosqr.id[0]){
							for(let i=fromsqr.id.charCodeAt(0)-1;i>tosqr.id.charCodeAt(0);i=i-1){
								let sq=document.getElementById(String.fromCharCode(i)+fromsqr.id[1]);
								if(sq.innerHTML!=""){
									return false;
								}
							}
							if(tosqr.innerHTML[0]=="B"){
								take(tosqr);
								return true;
							}else if(tosqr.innerHTML==""){
								return true;
							}
							return false;
						}
						console.log("broken");
						return false;
					}
					return false;
				}
				if(promotion[(parseInt(dragValue.id[5])-1)]=="Wbishop"){
					if(fromsqr.id[0]<tosqr.id[0] && fromsqr.id[1]<tosqr.id[1]){
						for(let i=fromsqr.id.charCodeAt(0)+1,j=fromsqr.id.charCodeAt(1)+1;i<tosqr.id.charCodeAt(0);i++,j++){
							let sq=document.getElementById(String.fromCharCode(i)+String.fromCharCode(j));
							if(sq.innerHTML!=""){
								return false;
							}
						}
						if(tosqr.innerHTML[0]=="B"){
							take(tosqr);
							return true;
						}else if(tosqr.innerHTML==""){
							return true;
						}
						return false;
					}
					if(fromsqr.id[0]>tosqr.id[0] && fromsqr.id[1]>tosqr.id[1]){
						for(let i=fromsqr.id.charCodeAt(0)-1,j=fromsqr.id.charCodeAt(1)-1;i>tosqr.id.charCodeAt(0);i=i-1,j=j-1){
							let sq=document.getElementById(String.fromCharCode(i)+String.fromCharCode(j));
							if(sq.innerHTML!=""){
								return false;
							}
						}
						if(tosqr.innerHTML[0]=="B"){
							take(tosqr);
							return true;
						}else if(tosqr.innerHTML==""){
							return true;
						}
						return false;
					}
					if(fromsqr.id[0]<tosqr.id[0] && fromsqr.id[1]>tosqr.id[1]){
						for(let i=fromsqr.id.charCodeAt(0)+1,j=fromsqr.id.charCodeAt(1)-1;i<tosqr.id.charCodeAt(0);i++,j=j-1){
							let sq=document.getElementById(String.fromCharCode(i)+String.fromCharCode(j));
							if(sq.innerHTML!=""){
								return false;
							}
						}
						if(tosqr.innerHTML[0]=="B"){
							take(tosqr);
							return true;
						}else if(tosqr.innerHTML==""){
							return true;
						}
						return false;
					}
					if(fromsqr.id[0]>tosqr.id[0] && fromsqr.id[1]<tosqr.id[1]){
						for(let i=fromsqr.id.charCodeAt(0)-1,j=fromsqr.id.charCodeAt(1)+1;i>tosqr.id.charCodeAt(0);i=i-1,j++){
							let sq=document.getElementById(String.fromCharCode(i)+String.fromCharCode(j));
							if(sq.innerHTML!=""){
								return false;
							}
						}
						if(tosqr.innerHTML[0]=="B"){
							take(tosqr);
							return true;
						}else if(tosqr.innerHTML==""){
							return true;
						}
						return false;
					}
					console.log("broken");
					return false;
				}
				if(promotion[(parseInt(dragValue.id[5])-1)]=="Wknight"){
					if(((Math.abs(tosqr.id.charCodeAt(0)-fromsqr.id.charCodeAt(0))==2 && Math.abs(tosqr.id.charCodeAt(1)-fromsqr.id.charCodeAt(1))==1) || (Math.abs(tosqr.id.charCodeAt(0)-fromsqr.id.charCodeAt(0))==1 && Math.abs(tosqr.id.charCodeAt(1)-fromsqr.id.charCodeAt(1))==2)) && tosqr.innerHTML[0]!="W"){
						if(tosqr.innerHTML[0]=="B"){
							take(tosqr);
							return true;
						}else{
							return true;
						}
					}
				}
			}
			if(tosqr.id[0]==fromsqr.id[0] && tosqr.id[1]-"0"==fromsqr.id[1]-"0"+1 && tosqr.innerHTML==""){
				hasMoved[(parseInt(dragValue.id[5])-1)]=true;
				return true;
			}
			if(!hasMoved[(parseInt(dragValue.id[5])-1)] && tosqr.id[0]==fromsqr.id[0] && tosqr.id[1]-"0"==fromsqr.id[1]-"0"+2 && tosqr.innerHTML==""){
				let sq=document.getElementById(tosqr.id[0]+(tosqr.id[1]-1));
				if(sq.innerHTML==""){
					hasMoved[(parseInt(dragValue.id[5])-1)]=true;
					enPass[(parseInt(dragValue.id[5])-1)]=move;
					return true;
				}
			}
			if((tosqr.id.charCodeAt(0)==fromsqr.id.charCodeAt(0)+1 || tosqr.id.charCodeAt(0)==fromsqr.id.charCodeAt(0)-1) && tosqr.id[1]-"0"==fromsqr.id[1]-"0"+1 && tosqr.innerHTML[0]=="B"){
				console.log("ya");
				take(tosqr);
				hasMoved[(parseInt(dragValue.id[5])-1)]=true;
				return true;
			}
			if((tosqr.id.charCodeAt(0)==fromsqr.id.charCodeAt(0)+1 || tosqr.id.charCodeAt(0)==fromsqr.id.charCodeAt(0)-1) && tosqr.id[1]-"0"==fromsqr.id[1]-"0"+1){
				console.log("ya2");
				let sq=document.getElementById(tosqr.id[0]+fromsqr.id[1]);
				let pic=document.getElementById(sq.innerHTML);
				if(sq.innerHTML[0]=="B" && sq.innerHTML[1]=="p" && enPass[(parseInt(pic.id[5])+7)]==move-1){
					take(sq);
					hasMoved[(parseInt(dragValue.id[5])-1)]=true;
					return true;
				}
			}
			return false;
		}
		if(dragValue.id[1]=="r"){
			if(tosqr.id[0]==fromsqr.id[0] && tosqr.id[1]!=fromsqr.id[1]){
				if(fromsqr.id[1]<tosqr.id[1]){
					for(let i=fromsqr.id.charCodeAt(1)+1;i<tosqr.id.charCodeAt(1);i++){
						let sq=document.getElementById(fromsqr.id[0]+String.fromCharCode(i));
						if(sq.innerHTML!=""){
							return false;
						}
					}
					if(tosqr.innerHTML[0]=="B"){
						take(tosqr);
						castleble[parseInt(dragValue.id[5])-1]=false;
						return true;
					}else if(tosqr.innerHTML==""){
						castleble[parseInt(dragValue.id[5])-1]=false;
						return true;
					}
					return false;
				}
				if(fromsqr.id[1]>tosqr.id[1]){
					for(let i=fromsqr.id.charCodeAt(1)-1;i>tosqr.id.charCodeAt(1);i=i-1){
						let sq=document.getElementById(fromsqr.id[0]+String.fromCharCode(i));
						if(sq.innerHTML!=""){
							return false;
						}
					}
					if(tosqr.innerHTML[0]=="B"){
						take(tosqr);
						castleble[parseInt(dragValue.id[5])-1]=false;
						return true;
					}else if(tosqr.innerHTML==""){
						castleble[parseInt(dragValue.id[5])-1]=false;
						return true;
					}
					return false;
				}
				console.log("broken");
				return false;
			}else if(tosqr.id[0]!=fromsqr.id[0] && tosqr.id[1]==fromsqr.id[1]){
				if(fromsqr.id[0]<tosqr.id[0]){
					for(let i=fromsqr.id.charCodeAt(0)+1;i<tosqr.id.charCodeAt(0);i++){
						let sq=document.getElementById(String.fromCharCode(i)+fromsqr.id[1]);
						if(sq.innerHTML!=""){
							return false;
						}
					}
					if(tosqr.innerHTML[0]=="B"){
						take(tosqr);
						castleble[parseInt(dragValue.id[5])-1]=false;
						return true;
					}else if(tosqr.innerHTML==""){
						castleble[parseInt(dragValue.id[5])-1]=false;
						return true;
					}
					return false;
				}
				if(fromsqr.id[0]>tosqr.id[0]){
					for(let i=fromsqr.id.charCodeAt(0)-1;i>tosqr.id.charCodeAt(0);i=i-1){
						let sq=document.getElementById(String.fromCharCode(i)+fromsqr.id[1]);
						if(sq.innerHTML!=""){
							return false;
						}
					}
					if(tosqr.innerHTML[0]=="B"){
						take(tosqr);
						castleble[parseInt(dragValue.id[5])-1]=false;
						return true;
					}else if(tosqr.innerHTML==""){
						castleble[parseInt(dragValue.id[5])-1]=false;
						return true;
					}
					return false;
				}
				console.log("broken");
				return false;
			}
			return false;
		}
		if(dragValue.id[1]=="b"){
			if(Math.abs(tosqr.id.charCodeAt(0)-fromsqr.id.charCodeAt(0))==Math.abs(tosqr.id[1]-fromsqr.id[1]) && fromsqr!=tosqr){
				if(fromsqr.id[0]<tosqr.id[0] && fromsqr.id[1]<tosqr.id[1]){
					for(let i=fromsqr.id.charCodeAt(0)+1,j=fromsqr.id.charCodeAt(1)+1;i<tosqr.id.charCodeAt(0);i++,j++){
						let sq=document.getElementById(String.fromCharCode(i)+String.fromCharCode(j));
						if(sq.innerHTML!=""){
							return false;
						}
					}
					if(tosqr.innerHTML[0]=="B"){
						take(tosqr);
						return true;
					}else if(tosqr.innerHTML==""){
						return true;
					}
					return false;
				}
				if(fromsqr.id[0]>tosqr.id[0] && fromsqr.id[1]>tosqr.id[1]){
					for(let i=fromsqr.id.charCodeAt(0)-1,j=fromsqr.id.charCodeAt(1)-1;i>tosqr.id.charCodeAt(0);i=i-1,j=j-1){
						let sq=document.getElementById(String.fromCharCode(i)+String.fromCharCode(j));
						if(sq.innerHTML!=""){
							return false;
						}
					}
					if(tosqr.innerHTML[0]=="B"){
						take(tosqr);
						return true;
					}else if(tosqr.innerHTML==""){
						return true;
					}
					return false;
				}
				if(fromsqr.id[0]<tosqr.id[0] && fromsqr.id[1]>tosqr.id[1]){
					for(let i=fromsqr.id.charCodeAt(0)+1,j=fromsqr.id.charCodeAt(1)-1;i<tosqr.id.charCodeAt(0);i++,j=j-1){
						let sq=document.getElementById(String.fromCharCode(i)+String.fromCharCode(j));
						if(sq.innerHTML!=""){
							return false;
						}
					}
					if(tosqr.innerHTML[0]=="B"){
						take(tosqr);
						return true;
					}else if(tosqr.innerHTML==""){
						return true;
					}
					return false;
				}
				if(fromsqr.id[0]>tosqr.id[0] && fromsqr.id[1]<tosqr.id[1]){
					for(let i=fromsqr.id.charCodeAt(0)-1,j=fromsqr.id.charCodeAt(1)+1;i>tosqr.id.charCodeAt(0);i=i-1,j++){
						let sq=document.getElementById(String.fromCharCode(i)+String.fromCharCode(j));
						if(sq.innerHTML!=""){
							return false;
						}
					}
					if(tosqr.innerHTML[0]=="B"){
						take(tosqr);
						return true;
					}else if(tosqr.innerHTML==""){
						return true;
					}
					return false;
				}
				console.log("broken");
				return false;
			}
		}
		if(dragValue.id[1]=="q"){
			if(tosqr.id[0]==fromsqr.id[0] && tosqr.id[1]!=fromsqr.id[1]){
				if(fromsqr.id[1]<tosqr.id[1]){
					for(let i=fromsqr.id.charCodeAt(1)+1;i<tosqr.id.charCodeAt(1);i++){
						let sq=document.getElementById(fromsqr.id[0]+String.fromCharCode(i));
						if(sq.innerHTML!=""){
							return false;
						}
					}
					if(tosqr.innerHTML[0]=="B"){
						take(tosqr);
						return true;
					}else if(tosqr.innerHTML==""){
						return true;
					}
					return false;
				}
				if(fromsqr.id[1]>tosqr.id[1]){
					for(let i=fromsqr.id.charCodeAt(1)-1;i>tosqr.id.charCodeAt(1);i=i-1){
						let sq=document.getElementById(fromsqr.id[0]+String.fromCharCode(i));
						if(sq.innerHTML!=""){
							return false;
						}
					}
					if(tosqr.innerHTML[0]=="B"){
						take(tosqr);
						return true;
					}else if(tosqr.innerHTML==""){
						return true;
					}
					return false;
				}
				console.log("broken");
				return false;
			}else if(tosqr.id[0]!=fromsqr.id[0] && tosqr.id[1]==fromsqr.id[1]){
				if(fromsqr.id[0]<tosqr.id[0]){
					for(let i=fromsqr.id.charCodeAt(0)+1;i<tosqr.id.charCodeAt(0);i++){
						let sq=document.getElementById(String.fromCharCode(i)+fromsqr.id[1]);
						if(sq.innerHTML!=""){
							return false;
						}
					}
					if(tosqr.innerHTML[0]=="B"){
						take(tosqr);
						return true;
					}else if(tosqr.innerHTML==""){
						return true;
					}
					return false;
				}
				if(fromsqr.id[0]>tosqr.id[0]){
					for(let i=fromsqr.id.charCodeAt(0)-1;i>tosqr.id.charCodeAt(0);i=i-1){
						let sq=document.getElementById(String.fromCharCode(i)+fromsqr.id[1]);
						if(sq.innerHTML!=""){
							return false;
						}
					}
					if(tosqr.innerHTML[0]=="B"){
						take(tosqr);
						return true;
					}else if(tosqr.innerHTML==""){
						return true;
					}
					return false;
				}
				console.log("broken");
				return false;
			}else if(Math.abs(tosqr.id.charCodeAt(0)-fromsqr.id.charCodeAt(0))==Math.abs(tosqr.id[1]-fromsqr.id[1]) && fromsqr!=tosqr){
				if(fromsqr.id[0]<tosqr.id[0] && fromsqr.id[1]<tosqr.id[1]){
					for(let i=fromsqr.id.charCodeAt(0)+1,j=fromsqr.id.charCodeAt(1)+1;i<tosqr.id.charCodeAt(0);i++,j++){
						let sq=document.getElementById(String.fromCharCode(i)+String.fromCharCode(j));
						if(sq.innerHTML!=""){
							return false;
						}
					}
					if(tosqr.innerHTML[0]=="B"){
						take(tosqr);
						return true;
					}else if(tosqr.innerHTML==""){
						return true;
					}
					return false;
				}
				if(fromsqr.id[0]>tosqr.id[0] && fromsqr.id[1]>tosqr.id[1]){
					for(let i=fromsqr.id.charCodeAt(0)-1,j=fromsqr.id.charCodeAt(1)-1;i>tosqr.id.charCodeAt(0);i=i-1,j=j-1){
						let sq=document.getElementById(String.fromCharCode(i)+String.fromCharCode(j));
						if(sq.innerHTML!=""){
							return false;
						}
					}
					if(tosqr.innerHTML[0]=="B"){
						take(tosqr);
						return true;
					}else if(tosqr.innerHTML==""){
						return true;
					}
					return false;
				}
				if(fromsqr.id[0]<tosqr.id[0] && fromsqr.id[1]>tosqr.id[1]){
					for(let i=fromsqr.id.charCodeAt(0)+1,j=fromsqr.id.charCodeAt(1)-1;i<tosqr.id.charCodeAt(0);i++,j=j-1){
						let sq=document.getElementById(String.fromCharCode(i)+String.fromCharCode(j));
						if(sq.innerHTML!=""){
							return false;
						}
					}
					if(tosqr.innerHTML[0]=="B"){
						take(tosqr);
						return true;
					}else if(tosqr.innerHTML==""){
						return true;
					}
					return false;
				}
				if(fromsqr.id[0]>tosqr.id[0] && fromsqr.id[1]<tosqr.id[1]){
					for(let i=fromsqr.id.charCodeAt(0)-1,j=fromsqr.id.charCodeAt(1)+1;i>tosqr.id.charCodeAt(0);i=i-1,j++){
						let sq=document.getElementById(String.fromCharCode(i)+String.fromCharCode(j));
						if(sq.innerHTML!=""){
							return false;
						}
					}
					if(tosqr.innerHTML[0]=="B"){
						take(tosqr);
						return true;
					}else if(tosqr.innerHTML==""){
						return true;
					}
					return false;
				}
				console.log("broken");
				return false;
			}
		}
		if(dragValue.id[1]=="k" && dragValue.id[2]=="n"){
			if(((Math.abs(tosqr.id.charCodeAt(0)-fromsqr.id.charCodeAt(0))==2 && Math.abs(tosqr.id.charCodeAt(1)-fromsqr.id.charCodeAt(1))==1) || (Math.abs(tosqr.id.charCodeAt(0)-fromsqr.id.charCodeAt(0))==1 && Math.abs(tosqr.id.charCodeAt(1)-fromsqr.id.charCodeAt(1))==2)) && tosqr.innerHTML[0]!="W"){
				if(tosqr.innerHTML[0]=="B"){
					take(tosqr);
					return true;
				}else{
					return true;
				}
			}
		}
		if(dragValue.id[1]=="k" && dragValue.id[2]=="i"){
			if(fromsqr.id[1]==tosqr.id[1] && tosqr.id.charCodeAt(0)-fromsqr.id.charCodeAt(0)==2){
				let middlsqr=document.getElementById("f1");
				if(middlsqr.innerHTML=="" && tosqr.innerHTML==""){
					if(castleble[1]==true && castleble[4]==true){
						let rook=document.getElementById("Wrook2");
						emptDiv.append(document.getElementById(Wrook2.id));
						rook.style.left=middlsqr.getBoundingClientRect().left+"px";
						rook.style.top=(middlsqr.getBoundingClientRect().top+scrollY)+"px";
						middlsqr.innerHTML="Wrook2";
						document.getElementById("h1").innerHTML="";
						return true;
					}
				}
			}
			if(fromsqr.id[1]==tosqr.id[1] && fromsqr.id.charCodeAt(0)-tosqr.id.charCodeAt(0)==2){
				let middlsqr=document.getElementById("d1");
				let lftsqr=document.getElementById("b1");
				if(middlsqr.innerHTML=="" && tosqr.innerHTML=="" && lftsqr.innerHTML==""){
					if(castleble[0]==true && castleble[4]==true){
						let rook=document.getElementById("Wrook1");
						emptDiv.append(document.getElementById(Wrook1.id));
						rook.style.left=middlsqr.getBoundingClientRect().left+"px";
						rook.style.top=(middlsqr.getBoundingClientRect().top+scrollY)+"px";
						middlsqr.innerHTML="Wrook1";
						document.getElementById("a1").innerHTML="";
						return true;
					}
				}
			}
			if((Math.abs(tosqr.id.charCodeAt(0)-fromsqr.id.charCodeAt(0))<=1 && Math.abs(tosqr.id.charCodeAt(1)-fromsqr.id.charCodeAt(1))<=1) && fromsqr!=tosqr && tosqr.innerHTML[0]!="W"){
				//if(isCheck()){
					if(tosqr.innerHTML[0]=="B"){
						take(tosqr);
						castleble[4]=false;
						return true;
					}else{
						castleble[4]=false;
						return true;
					}
				//}
			}
		}
	}else if(dragValue.id[0]=="B" && move%2==0){
		if(dragValue.id[1]=="p"){
			if(promotion[(parseInt(dragValue.id[5])+7)]!=""){
				if(promotion[(parseInt(dragValue.id[5])+7)]=="Bqueen"){
					if(tosqr.id[0]==fromsqr.id[0] && tosqr.id[1]!=fromsqr.id[1]){
						if(fromsqr.id[1]<tosqr.id[1]){
							for(let i=fromsqr.id.charCodeAt(1)+1;i<tosqr.id.charCodeAt(1);i++){
								let sq=document.getElementById(fromsqr.id[0]+String.fromCharCode(i));
								if(sq.innerHTML!=""){
									return false;
								}
							}
							if(tosqr.innerHTML[0]=="W"){
								take(tosqr);
								return true;
							}else if(tosqr.innerHTML==""){
								return true;
							}
							return false;
						}
						if(fromsqr.id[1]>tosqr.id[1]){
							for(let i=fromsqr.id.charCodeAt(1)-1;i>tosqr.id.charCodeAt(1);i=i-1){
								let sq=document.getElementById(fromsqr.id[0]+String.fromCharCode(i));
								if(sq.innerHTML!=""){
									return false;
								}
							}
							if(tosqr.innerHTML[0]=="W"){
								take(tosqr);
								return true;
							}else if(tosqr.innerHTML==""){
								return true;
							}
							return false;
						}
						console.log("broken");
						return false;
					}else if(tosqr.id[0]!=fromsqr.id[0] && tosqr.id[1]==fromsqr.id[1]){
						if(fromsqr.id[0]<tosqr.id[0]){
							for(let i=fromsqr.id.charCodeAt(0)+1;i<tosqr.id.charCodeAt(0);i++){
								let sq=document.getElementById(String.fromCharCode(i)+fromsqr.id[1]);
								if(sq.innerHTML!=""){
									return false;
								}
							}
							if(tosqr.innerHTML[0]=="W"){
								take(tosqr);
								return true;
							}else if(tosqr.innerHTML==""){
								return true;
							}
							return false;
						}
						if(fromsqr.id[0]>tosqr.id[0]){
							for(let i=fromsqr.id.charCodeAt(0)-1;i>tosqr.id.charCodeAt(0);i=i-1){
								let sq=document.getElementById(String.fromCharCode(i)+fromsqr.id[1]);
								if(sq.innerHTML!=""){
									return false;
								}
							}
							if(tosqr.innerHTML[0]=="W"){
								take(tosqr);
								return true;
							}else if(tosqr.innerHTML==""){
								return true;
							}
							return false;
						}
						console.log("broken");
						return false;
					}else if(Math.abs(tosqr.id.charCodeAt(0)-fromsqr.id.charCodeAt(0))==Math.abs(tosqr.id[1]-fromsqr.id[1]) && fromsqr!=tosqr){
						if(fromsqr.id[0]<tosqr.id[0] && fromsqr.id[1]<tosqr.id[1]){
							for(let i=fromsqr.id.charCodeAt(0)+1,j=fromsqr.id.charCodeAt(1)+1;i<tosqr.id.charCodeAt(0);i++,j++){
								let sq=document.getElementById(String.fromCharCode(i)+String.fromCharCode(j));
								if(sq.innerHTML!=""){
									return false;
								}
							}
							if(tosqr.innerHTML[0]=="W"){
								take(tosqr);
								return true;
							}else if(tosqr.innerHTML==""){
								return true;
							}
							return false;
						}
						if(fromsqr.id[0]>tosqr.id[0] && fromsqr.id[1]>tosqr.id[1]){
							for(let i=fromsqr.id.charCodeAt(0)-1,j=fromsqr.id.charCodeAt(1)-1;i>tosqr.id.charCodeAt(0);i=i-1,j=j-1){
								let sq=document.getElementById(String.fromCharCode(i)+String.fromCharCode(j));
								if(sq.innerHTML!=""){
									return false;
								}
							}
							if(tosqr.innerHTML[0]=="W"){
								take(tosqr);
								return true;
							}else if(tosqr.innerHTML==""){
								return true;
							}
							return false;
						}
						if(fromsqr.id[0]<tosqr.id[0] && fromsqr.id[1]>tosqr.id[1]){
							for(let i=fromsqr.id.charCodeAt(0)+1,j=fromsqr.id.charCodeAt(1)-1;i<tosqr.id.charCodeAt(0);i++,j=j-1){
								let sq=document.getElementById(String.fromCharCode(i)+String.fromCharCode(j));
								if(sq.innerHTML!=""){
									return false;
								}
							}
							if(tosqr.innerHTML[0]=="W"){
								take(tosqr);
								return true;
							}else if(tosqr.innerHTML==""){
								return true;
							}
							return false;
						}
						if(fromsqr.id[0]>tosqr.id[0] && fromsqr.id[1]<tosqr.id[1]){
							for(let i=fromsqr.id.charCodeAt(0)-1,j=fromsqr.id.charCodeAt(1)+1;i>tosqr.id.charCodeAt(0);i=i-1,j++){
								let sq=document.getElementById(String.fromCharCode(i)+String.fromCharCode(j));
								if(sq.innerHTML!=""){
									return false;
								}
							}
							if(tosqr.innerHTML[0]=="W"){
								take(tosqr);
								return true;
							}else if(tosqr.innerHTML==""){
								return true;
							}
							return false;
						}
						console.log("broken");
						return false;
					}
				}
				if(promotion[(parseInt(dragValue.id[5])+7)]=="Brook"){
					if(tosqr.id[0]==fromsqr.id[0] && tosqr.id[1]!=fromsqr.id[1]){
						if(fromsqr.id[1]<tosqr.id[1]){
							for(let i=fromsqr.id.charCodeAt(1)+1;i<tosqr.id.charCodeAt(1);i++){
								let sq=document.getElementById(fromsqr.id[0]+String.fromCharCode(i));
								if(sq.innerHTML!=""){
									return false;
								}
							}
							if(tosqr.innerHTML[0]=="W"){
								take(tosqr);
								return true;
							}else if(tosqr.innerHTML==""){
								return true;
							}
							return false;
						}
						if(fromsqr.id[1]>tosqr.id[1]){
							for(let i=fromsqr.id.charCodeAt(1)-1;i>tosqr.id.charCodeAt(1);i=i-1){
								let sq=document.getElementById(fromsqr.id[0]+String.fromCharCode(i));
								if(sq.innerHTML!=""){
									return false;
								}
							}
							if(tosqr.innerHTML[0]=="W"){
								take(tosqr);
								return true;
							}else if(tosqr.innerHTML==""){
								return true;
							}
							return false;
						}
						console.log("broken");
						return false;
					}else if(tosqr.id[0]!=fromsqr.id[0] && tosqr.id[1]==fromsqr.id[1]){
						if(fromsqr.id[0]<tosqr.id[0]){
							for(let i=fromsqr.id.charCodeAt(0)+1;i<tosqr.id.charCodeAt(0);i++){
								let sq=document.getElementById(String.fromCharCode(i)+fromsqr.id[1]);
								if(sq.innerHTML!=""){
									return false;
								}
							}
							if(tosqr.innerHTML[0]=="W"){
								take(tosqr);
								return true;
							}else if(tosqr.innerHTML==""){
								return true;
							}
							return false;
						}
						if(fromsqr.id[0]>tosqr.id[0]){
							for(let i=fromsqr.id.charCodeAt(0)-1;i>tosqr.id.charCodeAt(0);i=i-1){
								let sq=document.getElementById(String.fromCharCode(i)+fromsqr.id[1]);
								if(sq.innerHTML!=""){
									return false;
								}
							}
							if(tosqr.innerHTML[0]=="W"){
								take(tosqr);
								return true;
							}else if(tosqr.innerHTML==""){
								return true;
							}
							return false;
						}
						console.log("broken");
						return false;
					}
					return false;
				}
				if(promotion[(parseInt(dragValue.id[5])+7)]=="Bbishop"){
					if(fromsqr.id[0]<tosqr.id[0] && fromsqr.id[1]<tosqr.id[1]){
						for(let i=fromsqr.id.charCodeAt(0)+1,j=fromsqr.id.charCodeAt(1)+1;i<tosqr.id.charCodeAt(0);i++,j++){
							let sq=document.getElementById(String.fromCharCode(i)+String.fromCharCode(j));
							if(sq.innerHTML!=""){
								return false;
							}
						}
						if(tosqr.innerHTML[0]=="W"){
							take(tosqr);
							return true;
						}else if(tosqr.innerHTML==""){
							return true;
						}
						return false;
					}
					if(fromsqr.id[0]>tosqr.id[0] && fromsqr.id[1]>tosqr.id[1]){
						for(let i=fromsqr.id.charCodeAt(0)-1,j=fromsqr.id.charCodeAt(1)-1;i>tosqr.id.charCodeAt(0);i=i-1,j=j-1){
							let sq=document.getElementById(String.fromCharCode(i)+String.fromCharCode(j));
							if(sq.innerHTML!=""){
								return false;
							}
						}
						if(tosqr.innerHTML[0]=="W"){
							take(tosqr);
							return true;
						}else if(tosqr.innerHTML==""){
							return true;
						}
						return false;
					}
					if(fromsqr.id[0]<tosqr.id[0] && fromsqr.id[1]>tosqr.id[1]){
						for(let i=fromsqr.id.charCodeAt(0)+1,j=fromsqr.id.charCodeAt(1)-1;i<tosqr.id.charCodeAt(0);i++,j=j-1){
							let sq=document.getElementById(String.fromCharCode(i)+String.fromCharCode(j));
							if(sq.innerHTML!=""){
								return false;
							}
						}
						if(tosqr.innerHTML[0]=="W"){
							take(tosqr);
							return true;
						}else if(tosqr.innerHTML==""){
							return true;
						}
						return false;
					}
					if(fromsqr.id[0]>tosqr.id[0] && fromsqr.id[1]<tosqr.id[1]){
						for(let i=fromsqr.id.charCodeAt(0)-1,j=fromsqr.id.charCodeAt(1)+1;i>tosqr.id.charCodeAt(0);i=i-1,j++){
							let sq=document.getElementById(String.fromCharCode(i)+String.fromCharCode(j));
							if(sq.innerHTML!=""){
								return false;
							}
						}
						if(tosqr.innerHTML[0]=="W"){
							take(tosqr);
							return true;
						}else if(tosqr.innerHTML==""){
							return true;
						}
						return false;
					}
					console.log("broken");
					return false;
				}
				if(promotion[(parseInt(dragValue.id[5])+7)]=="Bknight"){
					if(((Math.abs(tosqr.id.charCodeAt(0)-fromsqr.id.charCodeAt(0))==2 && Math.abs(tosqr.id.charCodeAt(1)-fromsqr.id.charCodeAt(1))==1) || (Math.abs(tosqr.id.charCodeAt(0)-fromsqr.id.charCodeAt(0))==1 && Math.abs(tosqr.id.charCodeAt(1)-fromsqr.id.charCodeAt(1))==2)) && tosqr.innerHTML[0]!="W"){
						if(tosqr.innerHTML[0]=="W"){
							take(tosqr);
							return true;
						}else{
							return true;
						}
					}
				}
			}
			if(tosqr.id[0]==fromsqr.id[0] && tosqr.id[1]-"0"==fromsqr.id[1]-"0"-1 && tosqr.innerHTML==""){
				hasMoved[(parseInt(dragValue.id[5])+7)]=true;
				return true;
			}
			if(!hasMoved[(parseInt(dragValue.id[5])+7)] && tosqr.id[0]==fromsqr.id[0] && tosqr.id[1]-"0"==fromsqr.id[1]-"0"-2 && tosqr.innerHTML==""){
				let sq=document.getElementById(tosqr.id[0]+(tosqr.id[1]-(-1)));
				if(sq.innerHTML==""){
					hasMoved[(parseInt(dragValue.id[5])+7)]=true;
					enPass[(parseInt(dragValue.id[5])+7)]=move;
					return true;
				}
			}
			if((tosqr.id.charCodeAt(0)==fromsqr.id.charCodeAt(0)+1 || tosqr.id.charCodeAt(0)==fromsqr.id.charCodeAt(0)-1) && tosqr.id[1]-"0"==fromsqr.id[1]-"0"-1 && tosqr.innerHTML[0]=="W"){
				console.log("ya");
				take(tosqr);
				hasMoved[(parseInt(dragValue.id[5])+7)]=true;
				return true;
			}
			if((tosqr.id.charCodeAt(0)==fromsqr.id.charCodeAt(0)+1 || tosqr.id.charCodeAt(0)==fromsqr.id.charCodeAt(0)-1) && tosqr.id[1]-"0"==fromsqr.id[1]-"0"-1){
				console.log("ya2");
				let sq=document.getElementById(tosqr.id[0]+fromsqr.id[1]);
				let pic=document.getElementById(sq.innerHTML);
				if(sq.innerHTML[0]=="W" && sq.innerHTML[1]=="p" && enPass[(parseInt(pic.id[5])-1)]==move-1){
					take(sq);
					hasMoved[(parseInt(dragValue.id[5])+7)]=true;
					return true;
				}
			}
			return false;
		}
		if(dragValue.id[1]=="r"){
			if(tosqr.id[0]==fromsqr.id[0] && tosqr.id[1]!=fromsqr.id[1]){
				if(fromsqr.id[1]<tosqr.id[1]){
					for(let i=fromsqr.id.charCodeAt(1)+1;i<tosqr.id.charCodeAt(1);i++){
						let sq=document.getElementById(fromsqr.id[0]+String.fromCharCode(i));
						if(sq.innerHTML!=""){
							return false;
						}
					}
					if(tosqr.innerHTML[0]=="W"){
						take(tosqr);
						castleble[parseInt(dragValue.id[5])+1]=false;
						return true;
					}else if(tosqr.innerHTML==""){
						castleble[parseInt(dragValue.id[5])+1]=false;
						return true;
					}
					return false;
				}
				if(fromsqr.id[1]>tosqr.id[1]){
					for(let i=fromsqr.id.charCodeAt(1)-1;i>tosqr.id.charCodeAt(1);i=i-1){
						let sq=document.getElementById(fromsqr.id[0]+String.fromCharCode(i));
						if(sq.innerHTML!=""){
							return false;
						}
					}
					if(tosqr.innerHTML[0]=="W"){
						take(tosqr);
						castleble[parseInt(dragValue.id[5])+1]=false;
						return true;
					}else if(tosqr.innerHTML==""){
						castleble[parseInt(dragValue.id[5])+1]=false;
						return true;
					}
					return false;
				}
				console.log("broken");
				return false;
			}else if(tosqr.id[0]!=fromsqr.id[0] && tosqr.id[1]==fromsqr.id[1]){
				if(fromsqr.id[0]<tosqr.id[0]){
					for(let i=fromsqr.id.charCodeAt(0)+1;i<tosqr.id.charCodeAt(0);i++){
						let sq=document.getElementById(String.fromCharCode(i)+fromsqr.id[1]);
						if(sq.innerHTML!=""){
							return false;
						}
					}
					if(tosqr.innerHTML[0]=="W"){
						take(tosqr);
						castleble[parseInt(dragValue.id[5])+1]=false;
						return true;
					}else if(tosqr.innerHTML==""){
						castleble[parseInt(dragValue.id[5])+1]=false;
						return true;
					}
					return false;
				}
				if(fromsqr.id[0]>tosqr.id[0]){
					for(let i=fromsqr.id.charCodeAt(0)-1;i>tosqr.id.charCodeAt(0);i=i-1){
						let sq=document.getElementById(String.fromCharCode(i)+fromsqr.id[1]);
						if(sq.innerHTML!=""){
							return false;
						}
					}
					if(tosqr.innerHTML[0]=="W"){
						take(tosqr);
						castleble[parseInt(dragValue.id[5])+1]=false;
						return true;
					}else if(tosqr.innerHTML==""){
						castleble[parseInt(dragValue.id[5])+1]=false;
						return true;
					}
					return false;
				}
				console.log("broken");
				return false;
			}
			return false;
		}
		if(dragValue.id[1]=="b"){
			if(Math.abs(tosqr.id.charCodeAt(0)-fromsqr.id.charCodeAt(0))==Math.abs(tosqr.id[1]-fromsqr.id[1]) && fromsqr!=tosqr){
				if(fromsqr.id[0]<tosqr.id[0] && fromsqr.id[1]<tosqr.id[1]){
					for(let i=fromsqr.id.charCodeAt(0)+1,j=fromsqr.id.charCodeAt(1)+1;i<tosqr.id.charCodeAt(0);i++,j++){
						let sq=document.getElementById(String.fromCharCode(i)+String.fromCharCode(j));
						if(sq.innerHTML!=""){
							return false;
						}
					}
					if(tosqr.innerHTML[0]=="W"){
						take(tosqr);
						return true;
					}else if(tosqr.innerHTML==""){
						return true;
					}
					return false;
				}
				if(fromsqr.id[0]>tosqr.id[0] && fromsqr.id[1]>tosqr.id[1]){
					for(let i=fromsqr.id.charCodeAt(0)-1,j=fromsqr.id.charCodeAt(1)-1;i>tosqr.id.charCodeAt(0);i=i-1,j=j-1){
						let sq=document.getElementById(String.fromCharCode(i)+String.fromCharCode(j));
						if(sq.innerHTML!=""){
							return false;
						}
					}
					if(tosqr.innerHTML[0]=="W"){
						take(tosqr);
						return true;
					}else if(tosqr.innerHTML==""){
						return true;
					}
					return false;
				}
				if(fromsqr.id[0]<tosqr.id[0] && fromsqr.id[1]>tosqr.id[1]){
					for(let i=fromsqr.id.charCodeAt(0)+1,j=fromsqr.id.charCodeAt(1)-1;i<tosqr.id.charCodeAt(0);i++,j=j-1){
						let sq=document.getElementById(String.fromCharCode(i)+String.fromCharCode(j));
						if(sq.innerHTML!=""){
							return false;
						}
					}
					if(tosqr.innerHTML[0]=="W"){
						take(tosqr);
						return true;
					}else if(tosqr.innerHTML==""){
						return true;
					}
					return false;
				}
				if(fromsqr.id[0]>tosqr.id[0] && fromsqr.id[1]<tosqr.id[1]){
					for(let i=fromsqr.id.charCodeAt(0)-1,j=fromsqr.id.charCodeAt(1)+1;i>tosqr.id.charCodeAt(0);i=i-1,j++){
						let sq=document.getElementById(String.fromCharCode(i)+String.fromCharCode(j));
						if(sq.innerHTML!=""){
							return false;
						}
					}
					if(tosqr.innerHTML[0]=="W"){
						take(tosqr);
						return true;
					}else if(tosqr.innerHTML==""){
						return true;
					}
					return false;
				}
				console.log("broken");
				return false;
			}
		}
		if(dragValue.id[1]=="q"){
			if(tosqr.id[0]==fromsqr.id[0] && tosqr.id[1]!=fromsqr.id[1]){
				if(fromsqr.id[1]<tosqr.id[1]){
					for(let i=fromsqr.id.charCodeAt(1)+1;i<tosqr.id.charCodeAt(1);i++){
						let sq=document.getElementById(fromsqr.id[0]+String.fromCharCode(i));
						if(sq.innerHTML!=""){
							return false;
						}
					}
					if(tosqr.innerHTML[0]=="W"){
						take(tosqr);
						return true;
					}else if(tosqr.innerHTML==""){
						return true;
					}
					return false;
				}
				if(fromsqr.id[1]>tosqr.id[1]){
					for(let i=fromsqr.id.charCodeAt(1)-1;i>tosqr.id.charCodeAt(1);i=i-1){
						let sq=document.getElementById(fromsqr.id[0]+String.fromCharCode(i));
						if(sq.innerHTML!=""){
							return false;
						}
					}
					if(tosqr.innerHTML[0]=="W"){
						take(tosqr);
						return true;
					}else if(tosqr.innerHTML==""){
						return true;
					}
					return false;
				}
				console.log("broken");
				return false;
			}else if(tosqr.id[0]!=fromsqr.id[0] && tosqr.id[1]==fromsqr.id[1]){
				if(fromsqr.id[0]<tosqr.id[0]){
					for(let i=fromsqr.id.charCodeAt(0)+1;i<tosqr.id.charCodeAt(0);i++){
						let sq=document.getElementById(String.fromCharCode(i)+fromsqr.id[1]);
						if(sq.innerHTML!=""){
							return false;
						}
					}
					if(tosqr.innerHTML[0]=="W"){
						take(tosqr);
						return true;
					}else if(tosqr.innerHTML==""){
						return true;
					}
					return false;
				}
				if(fromsqr.id[0]>tosqr.id[0]){
					for(let i=fromsqr.id.charCodeAt(0)-1;i>tosqr.id.charCodeAt(0);i=i-1){
						let sq=document.getElementById(String.fromCharCode(i)+fromsqr.id[1]);
						if(sq.innerHTML!=""){
							return false;
						}
					}
					if(tosqr.innerHTML[0]=="W"){
						take(tosqr);
						return true;
					}else if(tosqr.innerHTML==""){
						return true;
					}
					return false;
				}
				console.log("broken");
				return false;
			}else if(Math.abs(tosqr.id.charCodeAt(0)-fromsqr.id.charCodeAt(0))==Math.abs(tosqr.id[1]-fromsqr.id[1]) && fromsqr!=tosqr){
				if(fromsqr.id[0]<tosqr.id[0] && fromsqr.id[1]<tosqr.id[1]){
					for(let i=fromsqr.id.charCodeAt(0)+1,j=fromsqr.id.charCodeAt(1)+1;i<tosqr.id.charCodeAt(0);i++,j++){
						let sq=document.getElementById(String.fromCharCode(i)+String.fromCharCode(j));
						if(sq.innerHTML!=""){
							return false;
						}
					}
					if(tosqr.innerHTML[0]=="W"){
						take(tosqr);
						return true;
					}else if(tosqr.innerHTML==""){
						return true;
					}
					return false;
				}
				if(fromsqr.id[0]>tosqr.id[0] && fromsqr.id[1]>tosqr.id[1]){
					for(let i=fromsqr.id.charCodeAt(0)-1,j=fromsqr.id.charCodeAt(1)-1;i>tosqr.id.charCodeAt(0);i=i-1,j=j-1){
						let sq=document.getElementById(String.fromCharCode(i)+String.fromCharCode(j));
						if(sq.innerHTML!=""){
							return false;
						}
					}
					if(tosqr.innerHTML[0]=="W"){
						take(tosqr);
						return true;
					}else if(tosqr.innerHTML==""){
						return true;
					}
					return false;
				}
				if(fromsqr.id[0]<tosqr.id[0] && fromsqr.id[1]>tosqr.id[1]){
					for(let i=fromsqr.id.charCodeAt(0)+1,j=fromsqr.id.charCodeAt(1)-1;i<tosqr.id.charCodeAt(0);i++,j=j-1){
						let sq=document.getElementById(String.fromCharCode(i)+String.fromCharCode(j));
						if(sq.innerHTML!=""){
							return false;
						}
					}
					if(tosqr.innerHTML[0]=="W"){
						take(tosqr);
						return true;
					}else if(tosqr.innerHTML==""){
						return true;
					}
					return false;
				}
				if(fromsqr.id[0]>tosqr.id[0] && fromsqr.id[1]<tosqr.id[1]){
					for(let i=fromsqr.id.charCodeAt(0)-1,j=fromsqr.id.charCodeAt(1)+1;i>tosqr.id.charCodeAt(0);i=i-1,j++){
						let sq=document.getElementById(String.fromCharCode(i)+String.fromCharCode(j));
						if(sq.innerHTML!=""){
							return false;
						}
					}
					if(tosqr.innerHTML[0]=="W"){
						take(tosqr);
						return true;
					}else if(tosqr.innerHTML==""){
						return true;
					}
					return false;
				}
				console.log("broken");
				return false;
			}
		}
		if(dragValue.id[1]=="k" && dragValue.id[2]=="n"){
			if(((Math.abs(tosqr.id.charCodeAt(0)-fromsqr.id.charCodeAt(0))==2 && Math.abs(tosqr.id.charCodeAt(1)-fromsqr.id.charCodeAt(1))==1) || (Math.abs(tosqr.id.charCodeAt(0)-fromsqr.id.charCodeAt(0))==1 && Math.abs(tosqr.id.charCodeAt(1)-fromsqr.id.charCodeAt(1))==2)) && tosqr.innerHTML[0]!="B"){
				if(tosqr.innerHTML[0]=="W"){
					take(tosqr);
					return true;
				}else{
					return true;
				}
			}
		}
		if(dragValue.id[1]=="k" && dragValue.id[2]=="i"){
			if(fromsqr.id[1]==tosqr.id[1] && tosqr.id.charCodeAt(0)-fromsqr.id.charCodeAt(0)==2){
				let middlsqr=document.getElementById("f8");
				if(middlsqr.innerHTML=="" && tosqr.innerHTML==""){
					if(castleble[3]==true && castleble[5]==true){
						let rook=document.getElementById("Brook2");
						emptDiv.append(document.getElementById(Brook2.id));
						rook.style.left=middlsqr.getBoundingClientRect().left+"px";
						rook.style.top=(middlsqr.getBoundingClientRect().top+scrollY)+"px";
						middlsqr.innerHTML="Brook2";
						document.getElementById("h8").innerHTML="";
						return true;
					}
				}
			}
			if(fromsqr.id[1]==tosqr.id[1] && fromsqr.id.charCodeAt(0)-tosqr.id.charCodeAt(0)==2){
				let middlsqr=document.getElementById("d8");
				let lftsqr=document.getElementById("b8");
				if(middlsqr.innerHTML=="" && tosqr.innerHTML=="" && lftsqr.innerHTML==""){
					if(castleble[2]==true && castleble[5]==true){
						let rook=document.getElementById("Brook1");
						emptDiv.append(document.getElementById(Brook1.id));
						rook.style.left=middlsqr.getBoundingClientRect().left+"px";
						rook.style.top=(middlsqr.getBoundingClientRect().top+scrollY)+"px";
						middlsqr.innerHTML="Brook1";
						document.getElementById("a8").innerHTML="";
						return true;
					}
				}
			}
			if((Math.abs(tosqr.id.charCodeAt(0)-fromsqr.id.charCodeAt(0))<=1 && Math.abs(tosqr.id.charCodeAt(1)-fromsqr.id.charCodeAt(1))<=1) && fromsqr!=tosqr && tosqr.innerHTML[0]!="B"){
				//if(isCheck()){
					if(tosqr.innerHTML[0]=="W"){
						take(tosqr);
						castleble[5]=false;
						return true;
					}else{
						castleble[5]=false;
						return true;
					}
				//}
			}
		}
	}else{
		return false;
	}
} 

document.onmouseup=function(e){
	if(isDrag){
		isDrag=false;
		let overABox=false;
		for(let i=0;i<64;i++){
			let pcstr="";
			for(let j=0;(squares[i].innerHTML[j]>="a" && squares[i].innerHTML[j]<="z") || (squares[i].innerHTML[j]>="A" && squares[i].innerHTML[j]<="Z") || (squares[i].innerHTML[j]>="0" && squares[i].innerHTML[j]<="9");j++){
				pcstr=pcstr+squares[i].innerHTML[j];
			}
			if(pcstr==dragValue.id){
				fromsqr=squares[i];
			}
		}
		for(let i=0;i<64;i++){
			if(squares[i].getBoundingClientRect().x<=e.clientX && squares[i].getBoundingClientRect().left+100>e.clientX && squares[i].getBoundingClientRect().top<=e.clientY && squares[i].getBoundingClientRect().top+100>e.clientY){
				if(canGo(squares[i])){
					if(dragValue.id[1]=="p" && ((squares[i].id[1]=="8" && dragValue.id[0]=="W") || (squares[i].id[1]=="1" && dragValue.id[0]=="B"))){
						if(dragValue.id[0]=="W"){
							promotion[(parseInt(dragValue.id[5])-1)]="Wqueen";
							let prmPc=document.getElementById(dragValue.id);
							prmPc.src="Chess_qlt60.png";
						}
						if(dragValue.id[0]=="B"){
							promotion[(parseInt(dragValue.id[5])+7)]="Bqueen";
							let prmPc=document.getElementById(dragValue.id);
							prmPc.src="Chess_qdt60.png";
						}
					}
					overABox=true;
					move++;
					dragValue.style.left=squares[i].getBoundingClientRect().left+"px";
					dragValue.style.top=(squares[i].getBoundingClientRect().top+scrollY)+"px";
					squares[i].innerHTML=dragValue.id;
					fromsqr.innerHTML="";
					if(WinPzl){
						//win
					}
					if(isPuzzle && !WinPzl){
						let automovedfrmsqr=document.getElementById(corrm.frm[move-1]);
						let automovedtosqr=document.getElementById(corrm.to[move-1]);
						let pieceautomovedid="";
						for(let j=0;(automovedfrmsqr.innerHTML[j]>="a" && automovedfrmsqr.innerHTML[j]<="z") || (automovedfrmsqr.innerHTML[j]>="A" && automovedfrmsqr.innerHTML[j]<="Z") || (automovedfrmsqr.innerHTML[j]>="0" && automovedfrmsqr.innerHTML[j]<="9");j++){
							pieceautomovedid=pieceautomovedid+automovedfrmsqr.innerHTML[j];
						}
						let pieceautomoved=document.getElementById(pieceautomovedid);
						let xm=automovedtosqr.getBoundingClientRect().left-pieceautomoved.getBoundingClientRect().left;
						let ym=(automovedtosqr.getBoundingClientRect().top+scrollY)-(pieceautomoved.getBoundingClientRect().top+scrollY);
						emptDiv.append(document.getElementById(pieceautomovedid));
						pieceautomoved.style.left=automovedfrmsqr.getBoundingClientRect().left+"px";
						pieceautomoved.style.top=(automovedfrmsqr.getBoundingClientRect().top+scrollY)+"px";
						gsap.to("#"+pieceautomoved.id,{x: xm, y: ym, duration: 0.5});
						setTimeout(() => {
							pieceautomoved.style.left=automovedtosqr.getBoundingClientRect().left+"px";
							pieceautomoved.style.top=(automovedtosqr.getBoundingClientRect().top+scrollY)+"px";
							gsap.set("#"+pieceautomoved.id,{x: 0, y: 0});
							automovedtosqr.innerHTML=pieceautomovedid;
							automovedfrmsqr.innerHTML="";
							move++;
						}, 510);
					}
				}
				//Wsquares[i].append(document.getElementById(dragValue.id));
			}
		}
		if(!overABox){
			dragValue.style.left=fromsqr.getBoundingClientRect().left+"px";
			dragValue.style.top=(fromsqr.getBoundingClientRect().top+scrollY)+"px";
		}
		dragValue=null;
	}
}

document.onmousemove=function(e){
	let x=e.pageX;
	let y=e.pageY;
	if(isDrag==true){
		emptDiv.append(document.getElementById(dragValue.id));
		dragValue.style.left=(x-50)+"px";
		dragValue.style.top=(y-50)+"px";
	}
}
