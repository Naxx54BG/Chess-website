let dragValue;
let isDrag=false;
let isPuzzle=false;//пъзел ли е
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
let attackedW=[];
let attackedB=[];
let castleble=[true,true,true,true,true,true];
let Wcheck=false;
let Bcheck=false;
let tempMoveTo;
let tempMoveFrom;
let WinPzl=false;
let winMoveForPzl=corrm.frm.length;
let move=1;// ако е пъзел 1-ти си белите, 2-ти си черните

for(let i=0;i<16;i++){
	hasMoved[i]=false;
	enPass[i]=-1;
}

function drag(piece){
	let drpiece=document.getElementById(piece);
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
	emptDiv.append(document.getElementById(pc.id));
	pc.style.left=-10000+"px";
	sqr.innerHTML="";
}

function canGo(tosqr,canTake){
	
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
		tempMoveFrom=fromsqr;
		tempMoveTo=tosqr;
		attkUptd();
		for(let i=0;i<64;i++){
			let pcstr="";
			for(let j=0;(squares[i].innerHTML[j]>="a" && squares[i].innerHTML[j]<="z") || (squares[i].innerHTML[j]>="A" && squares[i].innerHTML[j]<="Z") || (squares[i].innerHTML[j]>="0" && squares[i].innerHTML[j]<="9");j++){
				pcstr=pcstr+squares[i].innerHTML[j];
			}
			if(((pcstr=="Wking" && tempMoveFrom!=squares[i]) || (dragValue=="Wking" && tempMoveTo==squares[i])) && attackedB.indexOf(squares[i])!=-1){
				return false;
			}
		}
		tempMoveFrom=null;
		tempMoveTo=null;
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
								if(canTake){
									take(tosqr);
								}
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
								if(canTake){
									take(tosqr);
								}
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
								if(canTake){
									take(tosqr);
								}
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
								if(canTake){
									take(tosqr);
								}
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
								if(canTake){
									take(tosqr);
								}
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
								if(canTake){
									take(tosqr);
								}
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
								if(canTake){
									take(tosqr);
								}
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
								if(canTake){
									take(tosqr);
								}
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
								if(canTake){
									take(tosqr);
								}
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
								if(canTake){
									take(tosqr);
								}
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
								if(canTake){
									take(tosqr);
								}
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
								if(canTake){
									take(tosqr);
								}
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
							if(canTake){
								take(tosqr);
							}
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
							if(canTake){
								take(tosqr);
							}
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
							if(canTake){
								take(tosqr);
							}
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
							if(canTake){
								take(tosqr);
							}
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
							if(canTake){
								take(tosqr);
							}
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
				//console.log("ya");
				if(canTake){
					take(tosqr);
				}
				hasMoved[(parseInt(dragValue.id[5])-1)]=true;
				return true;
			}
			if((tosqr.id.charCodeAt(0)==fromsqr.id.charCodeAt(0)+1 || tosqr.id.charCodeAt(0)==fromsqr.id.charCodeAt(0)-1) && tosqr.id[1]-"0"==fromsqr.id[1]-"0"+1){
				//console.log("ya2");
				let sq=document.getElementById(tosqr.id[0]+fromsqr.id[1]);
				let pic=document.getElementById(sq.innerHTML);
				if(sq.innerHTML[0]=="B" && sq.innerHTML[1]=="p" && enPass[(parseInt(pic.id[5])+7)]==move-1){
					if(canTake){
						take(sq);
					}
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
						if(canTake){
							take(tosqr);
						}
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
						if(canTake){
							take(tosqr);
						}
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
						if(canTake){
							take(tosqr);
						}
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
						if(canTake){
							take(tosqr);
						}
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
						if(canTake){
							take(tosqr);
						}
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
						if(canTake){
							take(tosqr);
						}
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
						if(canTake){
							take(tosqr);
						}
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
						if(canTake){
							take(tosqr);
						}
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
						if(canTake){
							take(tosqr);
						}
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
						if(canTake){
							take(tosqr);
						}
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
						if(canTake){
							take(tosqr);
						}
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
						if(canTake){
							take(tosqr);
						}
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
						if(canTake){
							take(tosqr);
						}
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
						if(canTake){
							take(tosqr);
						}
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
						if(canTake){
							take(tosqr);
						}
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
						if(canTake){
							take(tosqr);
						}
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
					if(canTake){
						take(tosqr);
					}
					return true;
				}else{
					return true;
				}
			}
		}
		if(dragValue.id[1]=="k" && dragValue.id[2]=="i"){
			if(fromsqr.id[1]==tosqr.id[1] && tosqr.id.charCodeAt(0)-fromsqr.id.charCodeAt(0)==2){
				let middlsqr=document.getElementById("f1");
				if(middlsqr.innerHTML=="" && tosqr.innerHTML=="" && attackedB.indexOf(middlsqr)==-1 && attackedB.indexOf(tosqr)==-1 && attackedB.indexOf(fromsqr)==-1){
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
				if(middlsqr.innerHTML=="" && tosqr.innerHTML=="" && lftsqr.innerHTML=="" && attackedB.indexOf(middlsqr)==-1 && attackedB.indexOf(tosqr)==-1 && attackedB.indexOf(lftsqr)==-1 && attackedB.indexOf(fromsqr)==-1){
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
			if((Math.abs(tosqr.id.charCodeAt(0)-fromsqr.id.charCodeAt(0))<=1 && Math.abs(tosqr.id.charCodeAt(1)-fromsqr.id.charCodeAt(1))<=1) && fromsqr!=tosqr && tosqr.innerHTML[0]!="W" && attackedB.indexOf(tosqr)==-1){
					if(tosqr.innerHTML[0]=="B"){
						if(canTake){
							take(tosqr);
						}
						castleble[4]=false;
						return true;
					}else{
						castleble[4]=false;
						return true;
					}
			}
		}
		attkUptd();
	}else if(dragValue.id[0]=="B" && move%2==0){
		tempMoveFrom=fromsqr;
		tempMoveTo=tosqr;
		attkUptd();
		for(let i=0;i<64;i++){
			let pcstr="";
			for(let j=0;(squares[i].innerHTML[j]>="a" && squares[i].innerHTML[j]<="z") || (squares[i].innerHTML[j]>="A" && squares[i].innerHTML[j]<="Z") || (squares[i].innerHTML[j]>="0" && squares[i].innerHTML[j]<="9");j++){
				pcstr=pcstr+squares[i].innerHTML[j];
			}
			if(((pcstr=="Bking" && tempMoveFrom!=squares[i]) || (dragValue=="Bking" && tempMoveTo==squares[i])) && attackedW.indexOf(squares[i])!=-1){
				return false;
			}
		}
		tempMoveFrom=null;
		tempMoveTo=null;
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
								if(canTake){
									take(tosqr);
								}
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
								if(canTake){
									take(tosqr);
								}
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
								if(canTake){
									take(tosqr);
								}
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
								if(canTake){
									take(tosqr);
								}
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
								if(canTake){
									take(tosqr);
								}
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
								if(canTake){
									take(tosqr);
								}
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
								if(canTake){
									take(tosqr);
								}
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
								if(canTake){
									take(tosqr);
								}
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
								if(canTake){
									take(tosqr);
								}
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
								if(canTake){
									take(tosqr);
								}
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
								if(canTake){
									take(tosqr);
								}
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
								if(canTake){
									take(tosqr);
								}
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
							if(canTake){
								take(tosqr);
							}
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
							if(canTake){
								take(tosqr);
							}
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
							if(canTake){
								take(tosqr);
							}
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
							if(canTake){
								take(tosqr);
							}
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
					if(((Math.abs(tosqr.id.charCodeAt(0)-fromsqr.id.charCodeAt(0))==2 && Math.abs(tosqr.id.charCodeAt(1)-fromsqr.id.charCodeAt(1))==1) || (Math.abs(tosqr.id.charCodeAt(0)-fromsqr.id.charCodeAt(0))==1 && Math.abs(tosqr.id.charCodeAt(1)-fromsqr.id.charCodeAt(1))==2)) && tosqr.innerHTML[0]!="B"){
						if(tosqr.innerHTML[0]=="W"){
							if(canTake){
								take(tosqr);
							}
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
				//console.log("ya");
				if(canTake){
					take(tosqr);
				}
				hasMoved[(parseInt(dragValue.id[5])+7)]=true;
				return true;
			}
			if((tosqr.id.charCodeAt(0)==fromsqr.id.charCodeAt(0)+1 || tosqr.id.charCodeAt(0)==fromsqr.id.charCodeAt(0)-1) && tosqr.id[1]-"0"==fromsqr.id[1]-"0"-1){
				//console.log("ya2");
				let sq=document.getElementById(tosqr.id[0]+fromsqr.id[1]);
				let pic=document.getElementById(sq.innerHTML);
				if(sq.innerHTML[0]=="W" && sq.innerHTML[1]=="p" && enPass[(parseInt(pic.id[5])-1)]==move-1){
					if(canTake){
						take(sq);
					}
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
						if(canTake){
							take(tosqr);
						}
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
						if(canTake){
							take(tosqr);
						}
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
						if(canTake){
							take(tosqr);
						}
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
						if(canTake){
							take(tosqr);
						}
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
						if(canTake){
							take(tosqr);
						}
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
						if(canTake){
							take(tosqr);
						}
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
						if(canTake){
							take(tosqr);
						}
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
						if(canTake){
							take(tosqr);
						}
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
						if(canTake){
							take(tosqr);
						}
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
						if(canTake){
							take(tosqr);
						}
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
						if(canTake){
							take(tosqr);
						}
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
						if(canTake){
							take(tosqr);
						}
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
						if(canTake){
							take(tosqr);
						}
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
						if(canTake){
							take(tosqr);
						}
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
						if(canTake){
							take(tosqr);
						}
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
						if(canTake){
							take(tosqr);
						}
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
					if(canTake){
						take(tosqr);
					}
					return true;
				}else{
					return true;
				}
			}
		}
		if(dragValue.id[1]=="k" && dragValue.id[2]=="i"){
			if(fromsqr.id[1]==tosqr.id[1] && tosqr.id.charCodeAt(0)-fromsqr.id.charCodeAt(0)==2){
				let middlsqr=document.getElementById("f8");
				if(middlsqr.innerHTML=="" && tosqr.innerHTML=="" && attackedW.indexOf(middlsqr)==-1 && attackedW.indexOf(tosqr)==-1 && attackedW.indexOf(fromsqr)==-1){
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
				if(middlsqr.innerHTML=="" && tosqr.innerHTML=="" && lftsqr.innerHTML=="" && attackedW.indexOf(middlsqr)==-1 && attackedW.indexOf(tosqr)==-1 && attackedW.indexOf(lftsqr)==-1 && attackedW.indexOf(fromsqr)==-1){
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
			if((Math.abs(tosqr.id.charCodeAt(0)-fromsqr.id.charCodeAt(0))<=1 && Math.abs(tosqr.id.charCodeAt(1)-fromsqr.id.charCodeAt(1))<=1) && fromsqr!=tosqr && tosqr.innerHTML[0]!="B" && attackedW.indexOf(tosqr)==-1){
				//if(isCheck()){
					if(tosqr.innerHTML[0]=="W"){
						if(canTake){
							take(tosqr);
						}
						castleble[5]=false;
						return true;
					}else{
						castleble[5]=false;
						return true;
					}
				//}
			}
		}
		attkUptd();
	}else{
		return false;
	}
} 

function mateCheck(){
	for(let i=0;i<64;i++){
		for(let j=0;j<64;j++){
			if(i==j){
				continue;
			}
			let temp=dragValue;	
			let temp2=fromsqr;
			let pcstr="";
			for(let j=0;(squares[i].innerHTML[j]>="a" && squares[i].innerHTML[j]<="z") || (squares[i].innerHTML[j]>="A" && squares[i].innerHTML[j]<="Z") || (squares[i].innerHTML[j]>="0" && squares[i].innerHTML[j]<="9");j++){
				pcstr=pcstr+squares[i].innerHTML[j];
			}
			if(pcstr==""){
				continue;
			}
			if(move%2==0 && pcstr[0]=="W"){
				continue;
			}
			if(move%2==1 && pcstr[0]=="B"){
				continue;
			}
			let pcchk=document.getElementById(pcstr);
			dragValue=pcchk;
			fromsqr=squares[i];
			if(canGo(squares[j],false)){
				return false;
			}
			dragValue=temp;
			fromsqr=temp2;
		}
	}
	return true;
}

function attkUptd(){
	attackedW.length=0;
	attackedB.length=0;
	for(let i=0;i<64;i++){
		if(squares[i].innerHTML!=""){
			let pcstr="";
			for(let j=0;(squares[i].innerHTML[j]>="a" && squares[i].innerHTML[j]<="z") || (squares[i].innerHTML[j]>="A" && squares[i].innerHTML[j]<="Z") || (squares[i].innerHTML[j]>="0" && squares[i].innerHTML[j]<="9");j++){
				pcstr=pcstr+squares[i].innerHTML[j];
			}
			if(pcstr==""){
				continue;
			}
			let pcchk=document.getElementById(pcstr);
			if(pcchk.id[1]=="p" && tempMoveTo!=squares[i]){
				if(promotion[(parseInt(pcchk.id[5])-1)]!="" || promotion[(parseInt(pcchk.id[5])+7)]!=""){
					if(promotion[(parseInt(pcchk.id[5])-1)]=="Wqueen" || promotion[(parseInt(pcchk.id[5])+7)]=="Bqueen"){
						let lft=true,rght=true,up=true,dwn=true,uprght=true,uplft=true,dwnrght=true,dwnlft=true;
						for(let j=1;j<8;j++){
							let a="a",ch1="1",h="h",ch8="8";
							if(squares[i].id.charCodeAt(0)+j>h.charCodeAt(0)){
								rght=false;
							}
							if(rght){
								let attksqr=document.getElementById(String.fromCharCode(squares[i].id.charCodeAt(0)+j)+squares[i].id[1]);
								if(pcchk.id[0]=="W"){
									attackedW.push(attksqr);
								}
								if(pcchk.id[0]=="B"){
									attackedB.push(attksqr);
								}
								if(attksqr.innerHTML!=""){
									rght=false;										
								}
							}
							if(squares[i].id.charCodeAt(0)-j<a.charCodeAt(0)){
								lft=false;
							}
							if(lft){
								let attksqr=document.getElementById(String.fromCharCode(squares[i].id.charCodeAt(0)-j)+squares[i].id[1]);
								if(pcchk.id[0]=="W"){
									attackedW.push(attksqr);
								}
								if(pcchk.id[0]=="B"){
									attackedB.push(attksqr);
								}
								if(attksqr.innerHTML!=""){
									lft=false;										
								}
							}
							if(squares[i].id.charCodeAt(1)+j>ch8.charCodeAt(0)){
								up=false;
							}
							if(up){
								let attksqr=document.getElementById(squares[i].id[0]+String.fromCharCode(squares[i].id.charCodeAt(1)+j));
								if(pcchk.id[0]=="W"){
									attackedW.push(attksqr);
								}
								if(pcchk.id[0]=="B"){
									attackedB.push(attksqr);
								}
								if(attksqr.innerHTML!=""){
									up=false;										
								}
							}
							if(squares[i].id.charCodeAt(1)-j<ch1.charCodeAt(0)){
								dwn=false;
							}
							if(dwn){
								let attksqr=document.getElementById(squares[i].id[0]+String.fromCharCode(squares[i].id.charCodeAt(1)-j));
								if(pcchk.id[0]=="W"){
									attackedW.push(attksqr);
								}
								if(pcchk.id[0]=="B"){
									attackedB.push(attksqr);
								}
								if(attksqr.innerHTML!=""){
									dwn=false;										
								}
							}
							if(squares[i].id.charCodeAt(0)+j>h.charCodeAt(0) || squares[i].id.charCodeAt(1)+j>ch8.charCodeAt(0)){
								uprght=false;
							}
							if(uprght){
								let attksqr=document.getElementById(String.fromCharCode(squares[i].id.charCodeAt(0)+j)+String.fromCharCode(squares[i].id.charCodeAt(1)+j));
								if(pcchk.id[0]=="W"){
									attackedW.push(attksqr);
								}
								if(pcchk.id[0]=="B"){
									attackedB.push(attksqr);
								}
								if(attksqr.innerHTML!=""){
									uprght=false;										
								}
							}
							if(squares[i].id.charCodeAt(0)-j<a.charCodeAt(0) || squares[i].id.charCodeAt(1)+j>ch8.charCodeAt(0)){
								uplft=false;
							}
							if(uplft){
								let attksqr=document.getElementById(String.fromCharCode(squares[i].id.charCodeAt(0)-j)+String.fromCharCode(squares[i].id.charCodeAt(1)+j));
								if(pcchk.id[0]=="W"){
									attackedW.push(attksqr);
								}
								if(pcchk.id[0]=="B"){
									attackedB.push(attksqr);
								}
								if(attksqr.innerHTML!=""){
									uplft=false;										
								}
							}
							if(squares[i].id.charCodeAt(0)+j>h.charCodeAt(0) || squares[i].id.charCodeAt(1)-j<ch1.charCodeAt(0)){
								dwnrght=false;
							}
							if(dwnrght){
								let attksqr=document.getElementById(String.fromCharCode(squares[i].id.charCodeAt(0)+j)+String.fromCharCode(squares[i].id.charCodeAt(1)-j));
								if(pcchk.id[0]=="W"){
									attackedW.push(attksqr);
								}
								if(pcchk.id[0]=="B"){
									attackedB.push(attksqr);
								}
								if(attksqr.innerHTML!=""){
									dwnrght=false;										
								}
							}
							if(squares[i].id.charCodeAt(0)-j<a.charCodeAt(0) || squares[i].id.charCodeAt(1)-j<ch1.charCodeAt(0)){
								dwnlft=false;
							}
							if(dwnlft){
								let attksqr=document.getElementById(String.fromCharCode(squares[i].id.charCodeAt(0)-j)+String.fromCharCode(squares[i].id.charCodeAt(1)-j));
								if(pcchk.id[0]=="W"){
									attackedW.push(attksqr);
								}
								if(pcchk.id[0]=="B"){
									attackedB.push(attksqr);
								}
								if(attksqr.innerHTML!=""){
									dwnlft=false;										
								}
							}
						}
					}else if(promotion[(parseInt(pcchk.id[5])-1)]=="Wrook" || promotion[(parseInt(pcchk.id[5])+7)]=="Brook"){
						let lft=true,rght=true,up=true,dwn=true,uprght=true,uplft=true,dwnrght=true,dwnlft=true;
						for(let j=1;j<8;j++){
							let a="a",ch1="1",h="h",ch8="8";
							if(squares[i].id.charCodeAt(0)+j>h.charCodeAt(0)){
								rght=false;
							}
							if(rght){
								let attksqr=document.getElementById(String.fromCharCode(squares[i].id.charCodeAt(0)+j)+squares[i].id[1]);
								if(pcchk.id[0]=="W"){
									attackedW.push(attksqr);
								}
								if(pcchk.id[0]=="B"){
									attackedB.push(attksqr);
								}
								if(attksqr.innerHTML!=""){
									rght=false;										
								}
							}
							if(squares[i].id.charCodeAt(0)-j<a.charCodeAt(0)){
								lft=false;
							}
							if(lft){
								let attksqr=document.getElementById(String.fromCharCode(squares[i].id.charCodeAt(0)-j)+squares[i].id[1]);
								if(pcchk.id[0]=="W"){
									attackedW.push(attksqr);
								}
								if(pcchk.id[0]=="B"){
									attackedB.push(attksqr);
								}
								if(attksqr.innerHTML!=""){
									lft=false;										
								}
							}
							if(squares[i].id.charCodeAt(1)+j>ch8.charCodeAt(0)){
								up=false;
							}
							if(up){
								let attksqr=document.getElementById(squares[i].id[0]+String.fromCharCode(squares[i].id.charCodeAt(1)+j));
								if(pcchk.id[0]=="W"){
									attackedW.push(attksqr);
								}
								if(pcchk.id[0]=="B"){
									attackedB.push(attksqr);
								}
								if(attksqr.innerHTML!=""){
									up=false;										
								}
							}
							if(squares[i].id.charCodeAt(1)-j<ch1.charCodeAt(0)){
								dwn=false;
							}
							if(dwn){
								let attksqr=document.getElementById(squares[i].id[0]+String.fromCharCode(squares[i].id.charCodeAt(1)-j));
								if(pcchk.id[0]=="W"){
									attackedW.push(attksqr);
								}
								if(pcchk.id[0]=="B"){
									attackedB.push(attksqr);
								}
								if(attksqr.innerHTML!=""){
									dwn=false;										
								}
							}
						}
					}else if(promotion[(parseInt(pcchk.id[5])-1)]=="Wbishop" || promotion[(parseInt(pcchk.id[5])+7)]=="Bbishop"){
						let lft=true,rght=true,up=true,dwn=true,uprght=true,uplft=true,dwnrght=true,dwnlft=true;
						for(let j=1;j<8;j++){
							let a="a",ch1="1",h="h",ch8="8";
							if(squares[i].id.charCodeAt(0)+j>h.charCodeAt(0) || squares[i].id.charCodeAt(1)+j>ch8.charCodeAt(0)){
								uprght=false;
							}
							if(uprght){
								let attksqr=document.getElementById(String.fromCharCode(squares[i].id.charCodeAt(0)+j)+String.fromCharCode(squares[i].id.charCodeAt(1)+j));
								if(pcchk.id[0]=="W"){
									attackedW.push(attksqr);
								}
								if(pcchk.id[0]=="B"){
									attackedB.push(attksqr);
								}
								if(attksqr.innerHTML!=""){
									uprght=false;										
								}
							}
							if(squares[i].id.charCodeAt(0)-j<a.charCodeAt(0) || squares[i].id.charCodeAt(1)+j>ch8.charCodeAt(0)){
								uplft=false;
							}
							if(uplft){
								let attksqr=document.getElementById(String.fromCharCode(squares[i].id.charCodeAt(0)-j)+String.fromCharCode(squares[i].id.charCodeAt(1)+j));
								if(pcchk.id[0]=="W"){
									attackedW.push(attksqr);
								}
								if(pcchk.id[0]=="B"){
									attackedB.push(attksqr);
								}
								if(attksqr.innerHTML!=""){
									uplft=false;										
								}
							}
							if(squares[i].id.charCodeAt(0)+j>h.charCodeAt(0) || squares[i].id.charCodeAt(1)-j<ch1.charCodeAt(0)){
								dwnrght=false;
							}
							if(dwnrght){
								let attksqr=document.getElementById(String.fromCharCode(squares[i].id.charCodeAt(0)+j)+String.fromCharCode(squares[i].id.charCodeAt(1)-j));
								if(pcchk.id[0]=="W"){
									attackedW.push(attksqr);
								}
								if(pcchk.id[0]=="B"){
									attackedB.push(attksqr);
								}
								if(attksqr.innerHTML!=""){
									dwnrght=false;										
								}
							}
							if(squares[i].id.charCodeAt(0)-j<a.charCodeAt(0) || squares[i].id.charCodeAt(1)-j<ch1.charCodeAt(0)){
								dwnlft=false;
							}
							if(dwnlft){
								let attksqr=document.getElementById(String.fromCharCode(squares[i].id.charCodeAt(0)-j)+String.fromCharCode(squares[i].id.charCodeAt(1)-j));
								if(pcchk.id[0]=="W"){
									attackedW.push(attksqr);
								}
								if(pcchk.id[0]=="B"){
									attackedB.push(attksqr);
								}
								if(attksqr.innerHTML!=""){
									dwnlft=false;										
								}
							}
						}
					}else if(promotion[(parseInt(pcchk.id[5])-1)]=="Wknight" || promotion[(parseInt(pcchk.id[5])+7)]=="Bknight"){
						let a="a",ch1="1",h="h",ch8="8";
						if(pcchk.id[0]=="W"){
							if(squares[i].id.charCodeAt(0)+2<=h.charCodeAt(0) && squares[i].id.charCodeAt(1)+1<=ch8.charCodeAt(0)){
								attackedW.push(document.getElementById(String.fromCharCode(squares[i].id.charCodeAt(0)+2)+String.fromCharCode(squares[i].id.charCodeAt(1)+1)));
							}
							if(squares[i].id.charCodeAt(0)+2<=h.charCodeAt(0) && squares[i].id.charCodeAt(1)-1>=ch1.charCodeAt(0)){
								attackedW.push(document.getElementById(String.fromCharCode(squares[i].id.charCodeAt(0)+2)+String.fromCharCode(squares[i].id.charCodeAt(1)-1)));
							}
							if(squares[i].id.charCodeAt(0)-2>=a.charCodeAt(0) && squares[i].id.charCodeAt(1)+1<=ch8.charCodeAt(0)){
								attackedW.push(document.getElementById(String.fromCharCode(squares[i].id.charCodeAt(0)-2)+String.fromCharCode(squares[i].id.charCodeAt(1)+1)));
							}
							if(squares[i].id.charCodeAt(0)-2>=a.charCodeAt(0) && squares[i].id.charCodeAt(1)-1>=ch1.charCodeAt(0)){
								attackedW.push(document.getElementById(String.fromCharCode(squares[i].id.charCodeAt(0)-2)+String.fromCharCode(squares[i].id.charCodeAt(1)-1)));
							}
							if(squares[i].id.charCodeAt(0)+1<=h.charCodeAt(0) && squares[i].id.charCodeAt(1)+2<=ch8.charCodeAt(0)){
								attackedW.push(document.getElementById(String.fromCharCode(squares[i].id.charCodeAt(0)+1)+String.fromCharCode(squares[i].id.charCodeAt(1)+2)));
							}
							if(squares[i].id.charCodeAt(0)+1<=h.charCodeAt(0) && squares[i].id.charCodeAt(1)-2>=ch1.charCodeAt(0)){
								attackedW.push(document.getElementById(String.fromCharCode(squares[i].id.charCodeAt(0)+1)+String.fromCharCode(squares[i].id.charCodeAt(1)-2)));
							}
							if(squares[i].id.charCodeAt(0)-1>=a.charCodeAt(0) && squares[i].id.charCodeAt(1)+2<=ch8.charCodeAt(0)){
								attackedW.push(document.getElementById(String.fromCharCode(squares[i].id.charCodeAt(0)-1)+String.fromCharCode(squares[i].id.charCodeAt(1)+2)));
							}
							if(squares[i].id.charCodeAt(0)-1>=a.charCodeAt(0) && squares[i].id.charCodeAt(1)-2>=ch1.charCodeAt(0)){
								attackedW.push(document.getElementById(String.fromCharCode(squares[i].id.charCodeAt(0)-1)+String.fromCharCode(squares[i].id.charCodeAt(1)-2)));
							}
						}	
						if(pcchk.id[0]=="B"){
							if(squares[i].id.charCodeAt(0)+2<=h.charCodeAt(0) && squares[i].id.charCodeAt(1)+1<=ch8.charCodeAt(0)){
								attackedB.push(document.getElementById(String.fromCharCode(squares[i].id.charCodeAt(0)+2)+String.fromCharCode(squares[i].id.charCodeAt(1)+1)));
							}
							if(squares[i].id.charCodeAt(0)+2<=h.charCodeAt(0) && squares[i].id.charCodeAt(1)-1>=ch1.charCodeAt(0)){
								attackedB.push(document.getElementById(String.fromCharCode(squares[i].id.charCodeAt(0)+2)+String.fromCharCode(squares[i].id.charCodeAt(1)-1)));
							}
							if(squares[i].id.charCodeAt(0)-2>=a.charCodeAt(0) && squares[i].id.charCodeAt(1)+1<=ch8.charCodeAt(0)){
								attackedB.push(document.getElementById(String.fromCharCode(squares[i].id.charCodeAt(0)-2)+String.fromCharCode(squares[i].id.charCodeAt(1)+1)));
							}
							if(squares[i].id.charCodeAt(0)-2>=a.charCodeAt(0) && squares[i].id.charCodeAt(1)-1>=ch1.charCodeAt(0)){
								attackedB.push(document.getElementById(String.fromCharCode(squares[i].id.charCodeAt(0)-2)+String.fromCharCode(squares[i].id.charCodeAt(1)-1)));
							}
							if(squares[i].id.charCodeAt(0)+1<=h.charCodeAt(0) && squares[i].id.charCodeAt(1)+2<=ch8.charCodeAt(0)){
								attackedB.push(document.getElementById(String.fromCharCode(squares[i].id.charCodeAt(0)+1)+String.fromCharCode(squares[i].id.charCodeAt(1)+2)));
							}
							if(squares[i].id.charCodeAt(0)+1<=h.charCodeAt(0) && squares[i].id.charCodeAt(1)-2>=ch1.charCodeAt(0)){
								attackedB.push(document.getElementById(String.fromCharCode(squares[i].id.charCodeAt(0)+1)+String.fromCharCode(squares[i].id.charCodeAt(1)-2)));
							}
							if(squares[i].id.charCodeAt(0)-1>=a.charCodeAt(0) && squares[i].id.charCodeAt(1)+2<=ch8.charCodeAt(0)){
								attackedB.push(document.getElementById(String.fromCharCode(squares[i].id.charCodeAt(0)-1)+String.fromCharCode(squares[i].id.charCodeAt(1)+2)));
							}
							if(squares[i].id.charCodeAt(0)-1>=a.charCodeAt(0) && squares[i].id.charCodeAt(1)-2>=ch1.charCodeAt(0)){
								attackedB.push(document.getElementById(String.fromCharCode(squares[i].id.charCodeAt(0)-1)+String.fromCharCode(squares[i].id.charCodeAt(1)-2)));
							}
						}
					}
				}else{
					let a="a",ch1="1",h="h",ch8="8";
					if(pcchk.id[0]=="W"){
						if(squares[i].id.charCodeAt(0)+1<=h.charCodeAt(0) && squares[i].id.charCodeAt(1)+1<=ch8.charCodeAt(0)){
							attackedW.push(document.getElementById(String.fromCharCode(squares[i].id.charCodeAt(0)+1)+String.fromCharCode(squares[i].id.charCodeAt(1)+1)));
						}
						if(squares[i].id.charCodeAt(0)-1>=a.charCodeAt(0) && squares[i].id.charCodeAt(1)+1<=ch8.charCodeAt(0)){
							attackedW.push(document.getElementById(String.fromCharCode(squares[i].id.charCodeAt(0)-1)+String.fromCharCode(squares[i].id.charCodeAt(1)+1)));
						}
					}
					if(pcchk.id[0]=="B"){
						if(squares[i].id.charCodeAt(0)+1<=h.charCodeAt(0) && squares[i].id.charCodeAt(1)-1>=ch1.charCodeAt(0)){
							attackedB.push(document.getElementById(String.fromCharCode(squares[i].id.charCodeAt(0)+1)+String.fromCharCode(squares[i].id.charCodeAt(1)-1)));
						}
						if(squares[i].id.charCodeAt(0)-1>=a.charCodeAt(0) && squares[i].id.charCodeAt(1)-1>=ch1.charCodeAt(0)){
							attackedB.push(document.getElementById(String.fromCharCode(squares[i].id.charCodeAt(0)-1)+String.fromCharCode(squares[i].id.charCodeAt(1)-1)));
						}
					}
				}
			}
			if(pcchk.id[1]=="q" && tempMoveTo!=squares[i]){
				let lft=true,rght=true,up=true,dwn=true,uprght=true,uplft=true,dwnrght=true,dwnlft=true;
				for(let j=1;j<8;j++){
					let a="a",ch1="1",h="h",ch8="8";
					if(squares[i].id.charCodeAt(0)+j>h.charCodeAt(0) || tempMoveTo==squares[i]){
					//	console.log("1",tempMoveFrom,tempMoveTo);
						rght=false;
					}
					if(rght){
						let attksqr=document.getElementById(String.fromCharCode(squares[i].id.charCodeAt(0)+j)+squares[i].id[1]);
						if(pcchk.id[0]=="W"){
							attackedW.push(attksqr);
						}
						if(pcchk.id[0]=="B"){
							attackedB.push(attksqr);
						}
						if((attksqr.innerHTML!="" && tempMoveFrom!=attksqr) || tempMoveTo==attksqr){
							//console.log("2",attksqr,tempMoveFrom,tempMoveTo);
							rght=false;										
						}
					}
					if(squares[i].id.charCodeAt(0)-j<a.charCodeAt(0) || tempMoveTo==squares[i]){
						lft=false;
					}
					if(lft){
						let attksqr=document.getElementById(String.fromCharCode(squares[i].id.charCodeAt(0)-j)+squares[i].id[1]);
						if(pcchk.id[0]=="W"){
							attackedW.push(attksqr);
						}
						if(pcchk.id[0]=="B"){
							attackedB.push(attksqr);
						}
						if((attksqr.innerHTML!="" && tempMoveFrom!=attksqr) || tempMoveTo==attksqr){
							lft=false;										
						}
					}
					if(squares[i].id.charCodeAt(1)+j>ch8.charCodeAt(0) || tempMoveTo==squares[i]){
						up=false;
					}
					if(up){
						let attksqr=document.getElementById(squares[i].id[0]+String.fromCharCode(squares[i].id.charCodeAt(1)+j));
						if(pcchk.id[0]=="W"){
							attackedW.push(attksqr);
						}
						if(pcchk.id[0]=="B"){
							attackedB.push(attksqr);
						}
						if((attksqr.innerHTML!="" && tempMoveFrom!=attksqr) || tempMoveTo==attksqr){
							up=false;										
						}
					}
					if(squares[i].id.charCodeAt(1)-j<ch1.charCodeAt(0) || tempMoveTo==squares[i]){
						dwn=false;
					}
					if(dwn){
						let attksqr=document.getElementById(squares[i].id[0]+String.fromCharCode(squares[i].id.charCodeAt(1)-j));
						if(pcchk.id[0]=="W"){
							attackedW.push(attksqr);
						}
						if(pcchk.id[0]=="B"){
							attackedB.push(attksqr);
						}
						if((attksqr.innerHTML!="" && tempMoveFrom!=attksqr) || tempMoveTo==attksqr){
							dwn=false;										
						}
					}
					if(squares[i].id.charCodeAt(0)+j>h.charCodeAt(0) || squares[i].id.charCodeAt(1)+j>ch8.charCodeAt(0) || tempMoveTo==squares[i]){
						uprght=false;
					}
					if(uprght){
						let attksqr=document.getElementById(String.fromCharCode(squares[i].id.charCodeAt(0)+j)+String.fromCharCode(squares[i].id.charCodeAt(1)+j));
						if(pcchk.id[0]=="W"){
							attackedW.push(attksqr);
						}
						if(pcchk.id[0]=="B"){
							attackedB.push(attksqr);
						}
						if((attksqr.innerHTML!="" && tempMoveFrom!=attksqr) || tempMoveTo==attksqr){
							uprght=false;										
						}
					}
					if(squares[i].id.charCodeAt(0)-j<a.charCodeAt(0) || squares[i].id.charCodeAt(1)+j>ch8.charCodeAt(0) || tempMoveTo==squares[i]){
						uplft=false;
					}
					if(uplft){
						let attksqr=document.getElementById(String.fromCharCode(squares[i].id.charCodeAt(0)-j)+String.fromCharCode(squares[i].id.charCodeAt(1)+j));
						if(pcchk.id[0]=="W"){
							attackedW.push(attksqr);
						}
						if(pcchk.id[0]=="B"){
							attackedB.push(attksqr);
						}
						if((attksqr.innerHTML!="" && tempMoveFrom!=attksqr) || tempMoveTo==attksqr){
							uplft=false;										
						}
					}
					if(squares[i].id.charCodeAt(0)+j>h.charCodeAt(0) || squares[i].id.charCodeAt(1)-j<ch1.charCodeAt(0) || tempMoveTo==squares[i]){
						dwnrght=false;
					}
					if(dwnrght){
						let attksqr=document.getElementById(String.fromCharCode(squares[i].id.charCodeAt(0)+j)+String.fromCharCode(squares[i].id.charCodeAt(1)-j));
						if(pcchk.id[0]=="W"){
							attackedW.push(attksqr);
						}
						if(pcchk.id[0]=="B"){
							attackedB.push(attksqr);
						}
						if((attksqr.innerHTML!="" && tempMoveFrom!=attksqr) || tempMoveTo==attksqr){
							dwnrght=false;										
						}
					}
					if(squares[i].id.charCodeAt(0)-j<a.charCodeAt(0) || squares[i].id.charCodeAt(1)-j<ch1.charCodeAt(0) || tempMoveTo==squares[i]){
						dwnlft=false;
					}
					if(dwnlft){
						let attksqr=document.getElementById(String.fromCharCode(squares[i].id.charCodeAt(0)-j)+String.fromCharCode(squares[i].id.charCodeAt(1)-j));
						if(pcchk.id[0]=="W"){
							attackedW.push(attksqr);
						}
						if(pcchk.id[0]=="B"){
							attackedB.push(attksqr);
						}
						if((attksqr.innerHTML!="" && tempMoveFrom!=attksqr) || tempMoveTo==attksqr){
							dwnlft=false;										
						}
					}
				}
			}
			if(pcchk.id[1]=="r" && tempMoveTo!=squares[i]){
				let lft=true,rght=true,up=true,dwn=true,uprght=true,uplft=true,dwnrght=true,dwnlft=true;
				for(let j=1;j<8;j++){
					let a="a",ch1="1",h="h",ch8="8";
					if(squares[i].id.charCodeAt(0)+j>h.charCodeAt(0) || tempMoveTo==squares[i]){
						rght=false;
					}
					if(rght){
						let attksqr=document.getElementById(String.fromCharCode(squares[i].id.charCodeAt(0)+j)+squares[i].id[1]);
						if(pcchk.id[0]=="W"){
							attackedW.push(attksqr);
						}
						if(pcchk.id[0]=="B"){
							attackedB.push(attksqr);
						}
						if((attksqr.innerHTML!="" && tempMoveFrom!=attksqr) || tempMoveTo==attksqr){
							rght=false;										
						}
					}
					if(squares[i].id.charCodeAt(0)-j<a.charCodeAt(0) || tempMoveTo==squares[i]){
						lft=false;
					}
					if(lft){
						let attksqr=document.getElementById(String.fromCharCode(squares[i].id.charCodeAt(0)-j)+squares[i].id[1]);
						if(pcchk.id[0]=="W"){
							attackedW.push(attksqr);
						}
						if(pcchk.id[0]=="B"){
							attackedB.push(attksqr);
						}
						if((attksqr.innerHTML!="" && tempMoveFrom!=attksqr) || tempMoveTo==attksqr){
							lft=false;										
						}
					}
					if(squares[i].id.charCodeAt(1)+j>ch8.charCodeAt(0) || tempMoveTo==squares[i]){
						up=false;
					}
					if(up){
						let attksqr=document.getElementById(squares[i].id[0]+String.fromCharCode(squares[i].id.charCodeAt(1)+j));
						if(pcchk.id[0]=="W"){
							attackedW.push(attksqr);
						}
						if(pcchk.id[0]=="B"){
							attackedB.push(attksqr);
						}
						if((attksqr.innerHTML!="" && tempMoveFrom!=attksqr) || tempMoveTo==attksqr){
							up=false;										
						}
					}
					if(squares[i].id.charCodeAt(1)-j<ch1.charCodeAt(0) || tempMoveTo==squares[i]){
						dwn=false;
					}
					if(dwn){
						let attksqr=document.getElementById(squares[i].id[0]+String.fromCharCode(squares[i].id.charCodeAt(1)-j));
						if(pcchk.id[0]=="W"){
							attackedW.push(attksqr);
						}
						if(pcchk.id[0]=="B"){
							attackedB.push(attksqr);
						}
						if((attksqr.innerHTML!="" && tempMoveFrom!=attksqr) || tempMoveTo==attksqr){
							dwn=false;										
						}
					}
				}
			}
			if(pcchk.id[1]=="b" && tempMoveTo!=squares[i]){
				let lft=true,rght=true,up=true,dwn=true,uprght=true,uplft=true,dwnrght=true,dwnlft=true;
				for(let j=1;j<8;j++){
					let a="a",ch1="1",h="h",ch8="8";
					if(squares[i].id.charCodeAt(0)+j>h.charCodeAt(0) || squares[i].id.charCodeAt(1)+j>ch8.charCodeAt(0) || tempMoveTo==squares[i]){
						uprght=false;
					}
					if(uprght){
						let attksqr=document.getElementById(String.fromCharCode(squares[i].id.charCodeAt(0)+j)+String.fromCharCode(squares[i].id.charCodeAt(1)+j));
						if(pcchk.id[0]=="W"){
							attackedW.push(attksqr);
						}
						if(pcchk.id[0]=="B"){
							attackedB.push(attksqr);
						}
						if((attksqr.innerHTML!="" && tempMoveFrom!=attksqr) || tempMoveTo==attksqr){
							uprght=false;										
						}
					}
					if(squares[i].id.charCodeAt(0)-j<a.charCodeAt(0) || squares[i].id.charCodeAt(1)+j>ch8.charCodeAt(0) || tempMoveTo==squares[i]){
						uplft=false;
					}
					if(uplft){
						let attksqr=document.getElementById(String.fromCharCode(squares[i].id.charCodeAt(0)-j)+String.fromCharCode(squares[i].id.charCodeAt(1)+j));
						if(pcchk.id[0]=="W"){
							attackedW.push(attksqr);
						}
						if(pcchk.id[0]=="B"){
							attackedB.push(attksqr);
						}
						if((attksqr.innerHTML!="" && tempMoveFrom!=attksqr) || tempMoveTo==attksqr){
							uplft=false;										
						}
					}
					if(squares[i].id.charCodeAt(0)+j>h.charCodeAt(0) || squares[i].id.charCodeAt(1)-j<ch1.charCodeAt(0) || tempMoveTo==squares[i]){
						dwnrght=false;
					}
					if(dwnrght){
						let attksqr=document.getElementById(String.fromCharCode(squares[i].id.charCodeAt(0)+j)+String.fromCharCode(squares[i].id.charCodeAt(1)-j));
						if(pcchk.id[0]=="W"){
							attackedW.push(attksqr);
						}
						if(pcchk.id[0]=="B"){
							attackedB.push(attksqr);
						}
						if((attksqr.innerHTML!="" && tempMoveFrom!=attksqr) || tempMoveTo==attksqr){
							dwnrght=false;										
						}
					}
					if(squares[i].id.charCodeAt(0)-j<a.charCodeAt(0) || squares[i].id.charCodeAt(1)-j<ch1.charCodeAt(0) || tempMoveTo==squares[i]){
						dwnlft=false;
					}
					if(dwnlft){
						let attksqr=document.getElementById(String.fromCharCode(squares[i].id.charCodeAt(0)-j)+String.fromCharCode(squares[i].id.charCodeAt(1)-j));
						if(pcchk.id[0]=="W"){
							attackedW.push(attksqr);
						}
						if(pcchk.id[0]=="B"){
							attackedB.push(attksqr);
						}
						if((attksqr.innerHTML!="" && tempMoveFrom!=attksqr) || tempMoveTo==attksqr){
							dwnlft=false;										
						}
					}
				}
			}
			if(pcchk.id[1]=="k" && pcchk.id[2]=="n" && tempMoveTo!=squares[i]){
				let a="a",ch1="1",h="h",ch8="8";
				if(pcchk.id[0]=="W"){
					if(squares[i].id.charCodeAt(0)+2<=h.charCodeAt(0) && squares[i].id.charCodeAt(1)+1<=ch8.charCodeAt(0)){
						attackedW.push(document.getElementById(String.fromCharCode(squares[i].id.charCodeAt(0)+2)+String.fromCharCode(squares[i].id.charCodeAt(1)+1)));
					}
					if(squares[i].id.charCodeAt(0)+2<=h.charCodeAt(0) && squares[i].id.charCodeAt(1)-1>=ch1.charCodeAt(0)){
						attackedW.push(document.getElementById(String.fromCharCode(squares[i].id.charCodeAt(0)+2)+String.fromCharCode(squares[i].id.charCodeAt(1)-1)));
					}
					if(squares[i].id.charCodeAt(0)-2>=a.charCodeAt(0) && squares[i].id.charCodeAt(1)+1<=ch8.charCodeAt(0)){
						attackedW.push(document.getElementById(String.fromCharCode(squares[i].id.charCodeAt(0)-2)+String.fromCharCode(squares[i].id.charCodeAt(1)+1)));
					}
					if(squares[i].id.charCodeAt(0)-2>=a.charCodeAt(0) && squares[i].id.charCodeAt(1)-1>=ch1.charCodeAt(0)){
						attackedW.push(document.getElementById(String.fromCharCode(squares[i].id.charCodeAt(0)-2)+String.fromCharCode(squares[i].id.charCodeAt(1)-1)));
					}
					if(squares[i].id.charCodeAt(0)+1<=h.charCodeAt(0) && squares[i].id.charCodeAt(1)+2<=ch8.charCodeAt(0)){
						attackedW.push(document.getElementById(String.fromCharCode(squares[i].id.charCodeAt(0)+1)+String.fromCharCode(squares[i].id.charCodeAt(1)+2)));
					}
					if(squares[i].id.charCodeAt(0)+1<=h.charCodeAt(0) && squares[i].id.charCodeAt(1)-2>=ch1.charCodeAt(0)){
						attackedW.push(document.getElementById(String.fromCharCode(squares[i].id.charCodeAt(0)+1)+String.fromCharCode(squares[i].id.charCodeAt(1)-2)));
					}
					if(squares[i].id.charCodeAt(0)-1>=a.charCodeAt(0) && squares[i].id.charCodeAt(1)+2<=ch8.charCodeAt(0)){
						attackedW.push(document.getElementById(String.fromCharCode(squares[i].id.charCodeAt(0)-1)+String.fromCharCode(squares[i].id.charCodeAt(1)+2)));
					}
					if(squares[i].id.charCodeAt(0)-1>=a.charCodeAt(0) && squares[i].id.charCodeAt(1)-2>=ch1.charCodeAt(0)){
						attackedW.push(document.getElementById(String.fromCharCode(squares[i].id.charCodeAt(0)-1)+String.fromCharCode(squares[i].id.charCodeAt(1)-2)));
					}
				}	
				if(pcchk.id[0]=="B"){
					if(squares[i].id.charCodeAt(0)+2<=h.charCodeAt(0) && squares[i].id.charCodeAt(1)+1<=ch8.charCodeAt(0)){
						attackedB.push(document.getElementById(String.fromCharCode(squares[i].id.charCodeAt(0)+2)+String.fromCharCode(squares[i].id.charCodeAt(1)+1)));
					}
					if(squares[i].id.charCodeAt(0)+2<=h.charCodeAt(0) && squares[i].id.charCodeAt(1)-1>=ch1.charCodeAt(0)){
						attackedB.push(document.getElementById(String.fromCharCode(squares[i].id.charCodeAt(0)+2)+String.fromCharCode(squares[i].id.charCodeAt(1)-1)));
					}
					if(squares[i].id.charCodeAt(0)-2>=a.charCodeAt(0) && squares[i].id.charCodeAt(1)+1<=ch8.charCodeAt(0)){
						attackedB.push(document.getElementById(String.fromCharCode(squares[i].id.charCodeAt(0)-2)+String.fromCharCode(squares[i].id.charCodeAt(1)+1)));
					}
					if(squares[i].id.charCodeAt(0)-2>=a.charCodeAt(0) && squares[i].id.charCodeAt(1)-1>=ch1.charCodeAt(0)){
						attackedB.push(document.getElementById(String.fromCharCode(squares[i].id.charCodeAt(0)-2)+String.fromCharCode(squares[i].id.charCodeAt(1)-1)));
					}
					if(squares[i].id.charCodeAt(0)+1<=h.charCodeAt(0) && squares[i].id.charCodeAt(1)+2<=ch8.charCodeAt(0)){
						attackedB.push(document.getElementById(String.fromCharCode(squares[i].id.charCodeAt(0)+1)+String.fromCharCode(squares[i].id.charCodeAt(1)+2)));
					}
					if(squares[i].id.charCodeAt(0)+1<=h.charCodeAt(0) && squares[i].id.charCodeAt(1)-2>=ch1.charCodeAt(0)){
						attackedB.push(document.getElementById(String.fromCharCode(squares[i].id.charCodeAt(0)+1)+String.fromCharCode(squares[i].id.charCodeAt(1)-2)));
					}
					if(squares[i].id.charCodeAt(0)-1>=a.charCodeAt(0) && squares[i].id.charCodeAt(1)+2<=ch8.charCodeAt(0)){
						attackedB.push(document.getElementById(String.fromCharCode(squares[i].id.charCodeAt(0)-1)+String.fromCharCode(squares[i].id.charCodeAt(1)+2)));
					}
					if(squares[i].id.charCodeAt(0)-1>=a.charCodeAt(0) && squares[i].id.charCodeAt(1)-2>=ch1.charCodeAt(0)){
						attackedB.push(document.getElementById(String.fromCharCode(squares[i].id.charCodeAt(0)-1)+String.fromCharCode(squares[i].id.charCodeAt(1)-2)));
					}
				}
			}
			if(pcchk.id[1]=="k" && pcchk.id[2]=="i"){
				let a="a",ch1="1",h="h",ch8="8";
				if(pcchk.id[0]=="W"){
					if(squares[i].id.charCodeAt(0)+1<=h.charCodeAt(0) && squares[i].id.charCodeAt(1)+1<=ch8.charCodeAt(0)){
						attackedW.push(document.getElementById(String.fromCharCode(squares[i].id.charCodeAt(0)+1)+String.fromCharCode(squares[i].id.charCodeAt(1)+1)));
					}
					if(squares[i].id.charCodeAt(0)+1<=h.charCodeAt(0) && squares[i].id.charCodeAt(1)-1>=ch1.charCodeAt(0)){
						attackedW.push(document.getElementById(String.fromCharCode(squares[i].id.charCodeAt(0)+1)+String.fromCharCode(squares[i].id.charCodeAt(1)-1)));
					}
					if(squares[i].id.charCodeAt(0)-1>=a.charCodeAt(0) && squares[i].id.charCodeAt(1)+1<=ch8.charCodeAt(0)){
						attackedW.push(document.getElementById(String.fromCharCode(squares[i].id.charCodeAt(0)-1)+String.fromCharCode(squares[i].id.charCodeAt(1)+1)));
					}
					if(squares[i].id.charCodeAt(0)-1>=a.charCodeAt(0) && squares[i].id.charCodeAt(1)-1>=ch1.charCodeAt(0)){
						attackedW.push(document.getElementById(String.fromCharCode(squares[i].id.charCodeAt(0)-1)+String.fromCharCode(squares[i].id.charCodeAt(1)-1)));
					}
					if(squares[i].id.charCodeAt(1)+1<=ch8.charCodeAt(0)){
						attackedW.push(document.getElementById(String.fromCharCode(squares[i].id.charCodeAt(0))+String.fromCharCode(squares[i].id.charCodeAt(1)+1)));
					}
					if(squares[i].id.charCodeAt(1)-1>=ch1.charCodeAt(0)){
						attackedW.push(document.getElementById(String.fromCharCode(squares[i].id.charCodeAt(0))+String.fromCharCode(squares[i].id.charCodeAt(1)-1)));
					}
					if(squares[i].id.charCodeAt(0)+1<=h.charCodeAt(0)){
						attackedW.push(document.getElementById(String.fromCharCode(squares[i].id.charCodeAt(0)+1)+String.fromCharCode(squares[i].id.charCodeAt(1))));
					}
					if(squares[i].id.charCodeAt(0)-1>=a.charCodeAt(0)){
						attackedW.push(document.getElementById(String.fromCharCode(squares[i].id.charCodeAt(0)-1)+String.fromCharCode(squares[i].id.charCodeAt(1))));
					}
				}	
				if(pcchk.id[0]=="B"){
					if(squares[i].id.charCodeAt(0)+1<=h.charCodeAt(0) && squares[i].id.charCodeAt(1)+1<=ch8.charCodeAt(0)){
						attackedB.push(document.getElementById(String.fromCharCode(squares[i].id.charCodeAt(0)+1)+String.fromCharCode(squares[i].id.charCodeAt(1)+1)));
					}
					if(squares[i].id.charCodeAt(0)+1<=h.charCodeAt(0) && squares[i].id.charCodeAt(1)-1>=ch1.charCodeAt(0)){
						attackedB.push(document.getElementById(String.fromCharCode(squares[i].id.charCodeAt(0)+1)+String.fromCharCode(squares[i].id.charCodeAt(1)-1)));
					}
					if(squares[i].id.charCodeAt(0)-1>=a.charCodeAt(0) && squares[i].id.charCodeAt(1)+1<=ch8.charCodeAt(0)){
						attackedB.push(document.getElementById(String.fromCharCode(squares[i].id.charCodeAt(0)-1)+String.fromCharCode(squares[i].id.charCodeAt(1)+1)));
					}
					if(squares[i].id.charCodeAt(0)-1>=a.charCodeAt(0) && squares[i].id.charCodeAt(1)-1>=ch1.charCodeAt(0)){
						attackedB.push(document.getElementById(String.fromCharCode(squares[i].id.charCodeAt(0)-1)+String.fromCharCode(squares[i].id.charCodeAt(1)-1)));
					}
					if(squares[i].id.charCodeAt(1)+1<=ch8.charCodeAt(0)){
						attackedB.push(document.getElementById(String.fromCharCode(squares[i].id.charCodeAt(0))+String.fromCharCode(squares[i].id.charCodeAt(1)+1)));
					}
					if(squares[i].id.charCodeAt(1)-1>=ch1.charCodeAt(0)){
						attackedB.push(document.getElementById(String.fromCharCode(squares[i].id.charCodeAt(0))+String.fromCharCode(squares[i].id.charCodeAt(1)-1)));
					}
					if(squares[i].id.charCodeAt(0)+1<=h.charCodeAt(0)){
						attackedB.push(document.getElementById(String.fromCharCode(squares[i].id.charCodeAt(0)+1)+String.fromCharCode(squares[i].id.charCodeAt(1))));
					}
					if(squares[i].id.charCodeAt(0)-1>=a.charCodeAt(0)){
						attackedB.push(document.getElementById(String.fromCharCode(squares[i].id.charCodeAt(0)-1)+String.fromCharCode(squares[i].id.charCodeAt(1))));
					}
				}
			}
		}
	}
}

document.onmouseup=function(e){
	if(isDrag){
		for(let i=0;i<64;i++){
			if(squares[i].className[0]=="W"){
				squares[i].style.backgroundColor="white";
			}
			if(squares[i].className[0]=="B"){
				squares[i].style.backgroundColor="#c24529";
			}
		}
		/*for(let i=0;i<attackedB.length;i++){
			attackedB[i].style.backgroundColor="white";
		}*/
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
				if(canGo(squares[i],true)){
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
					dragValue.style.left=squares[i].getBoundingClientRect().left+"px";
					dragValue.style.top=(squares[i].getBoundingClientRect().top+scrollY)+"px";
					squares[i].innerHTML=dragValue.id;
					fromsqr.innerHTML="";
					move++;
					if(mateCheck()){
						emptDiv.innerHTML="YOU WON!!!!!!"+emptDiv.innerHTML;
					}
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
						}, 520);
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
		attkUptd();
		/*for(let i=0;i<attackedB.length;i++){
			attackedB[i].style.backgroundColor="red";
		}*/
		
	}
}

document.onmousemove=function(e){
	let x=e.pageX;
	let y=e.pageY;
	if(isDrag==true ){
		if(isPuzzle){
			if(move%2==1 && dragValue.id[0]=="W"){
				emptDiv.append(document.getElementById(dragValue.id));
				dragValue.style.left=(x-50)+"px";
				dragValue.style.top=(y-50)+"px";
			}
			if(move%2==0 && dragValue.id[0]=="B"){
				emptDiv.append(document.getElementById(dragValue.id));
				dragValue.style.left=(x-50)+"px";
				dragValue.style.top=(y-50)+"px";
			}
		}else{
			emptDiv.append(document.getElementById(dragValue.id));
			dragValue.style.left=(x-50)+"px";
			dragValue.style.top=(y-50)+"px";
		}
	}
}
