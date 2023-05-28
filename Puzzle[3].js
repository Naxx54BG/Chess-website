let dragValue;
let stalemate=false;
let isDrag=false;
let isPuzzle=true;//пъзел ли е
let fromsqr;
let emptDiv=document.getElementById("emptyDiv");
let squares=document.querySelectorAll(".square");//+document.querySelectorAll(".Bsquare");
let ovrSqr;
let hasMoved=[];
let enPass=[];
let corrm={
	frm: [/*"",*/"g2","h6"],//ако си черените остави нулевия индекс празен (както съм го направил с коментара)
	to: [/*"",*/"g4","a6"],
};
let castleMove=8;
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
let move=2;// ако е пъзел 1-ти си белите, 2-ти си черните
let lstDrag;
gsap.set("#arrow_front",{x: "0",y: "-50vh"});
gsap.set("#arrow_back",{x: "0",y: "-50vh"});
gsap.set("#PuzzleNum",{x: "0",y: "-99vh"});
gsap.set("#retBut",{x: "0",y: "-111vh"});

for(let i=0;i<16;i++){
	hasMoved[i]=false;
	enPass[i]=-1;
}

function drag(piece){
	let drpiece=document.getElementById(piece);
 	//drpiece.style.position="relative";
 	drpiece.addEventListener("mousedown", function(e) {
		e.preventDefault();
		let x=e.pageX;
		let y=e.pageY;
		emptDiv.append(document.getElementById(drpiece.id));
		drpiece.style.left=(x-(drpiece.clientWidth/2))+"px";
		drpiece.style.top=(y-(drpiece.clientHeight/2))+"px";
		isDrag=true;
   		dragValue=drpiece;
 	});
	drpiece.addEventListener("touchstart", function(e) {
		e.preventDefault();
		let x=e.touches[0].pageX;
		let y=e.touches[0].pageY;
		emptDiv.append(document.getElementById(drpiece.id));
		drpiece.style.left=(x-(drpiece.clientWidth/2))+"px";
		drpiece.style.top=(y-(drpiece.clientWidth/2))+"px";
		isDrag=true;
		dragValue=drpiece;
	});
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
			let whole_name=squares[i].innerHTML;
			for(let k=0;(whole_name[k]>="a" && whole_name[k]<="z") || (whole_name[k]>="A" && whole_name[k]<="Z") || (whole_name[k]>="0" && whole_name[k]<="9");k++){
				pcstr=pcstr+whole_name[k]; 
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
		console.log(tosqr);
		tempMoveFrom=fromsqr;
		tempMoveTo=tosqr;
		attkUptd();
		for(let i=0;i<64;i++){
			let pcstr="";
			let whole_name=squares[i].innerHTML;
			for(let k=0;(whole_name[k]>="a" && whole_name[k]<="z") || (whole_name[k]>="A" && whole_name[k]<="Z") || (whole_name[k]>="0" && whole_name[k]<="9");k++){
				pcstr=pcstr+whole_name[k]; 
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
	}
	
} 

function mateCheck(){
	attkUptd();
	for(let i=0;i<64;i++){
		let temp=dragValue;	
		let temp2=fromsqr;
		let pcstr="";
		let whole_name=squares[i].innerHTML;
		for(let k=0;(whole_name[k]>="a" && whole_name[k]<="z") || (whole_name[k]>="A" && whole_name[k]<="Z") || (whole_name[k]>="0" && whole_name[k]<="9");k++){
			pcstr=pcstr+whole_name[k]; 
		}
		if(pcstr==""){
			continue;
		}
		if(pcstr=="Wking" && attackedB.indexOf(squares[i])!=-1){
			Bcheck=true;
		}
		if(pcstr=="Bking" && attackedW.indexOf(squares[i])!=-1){
			Wcheck=true;
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
		for(let j=0;j<64;j++){
			if(i==j){
				continue;
			}
			if(canGo(squares[j],false)){
				dragValue=temp;
				fromsqr=temp2;
				Wcheck=false;
				Bcheck=false;
				return false;
			}
		}
		dragValue=temp;
		fromsqr=temp2;
	}
	if(move%2==1 && !Bcheck){
		stalemate=true;
	}
	if(move%2==0 && !Wcheck){
		stalemate=true;
	}
	return true;
}

function attkUptd(){
	attackedW.length=0;
	attackedB.length=0;
	for(let i=0;i<64;i++){
		if(squares[i].innerHTML!=""){
			let pcstr="";
			let whole_name=squares[i].innerHTML;
			for(let k=0;(whole_name[k]>="a" && whole_name[k]<="z") || (whole_name[k]>="A" && whole_name[k]<="Z") || (whole_name[k]>="0" && whole_name[k]<="9");k++){
				pcstr=pcstr+whole_name[k]; 
			}
			if(pcstr==""){
				continue;
			}
			let pcchk=document.getElementById(pcstr);
			if(pcchk.id[1]=="p" && tempMoveTo!=squares[i]){
				if((promotion[(parseInt(pcchk.id[5])-1)]!="" && pcchk.id[0]=="W") || (promotion[(parseInt(pcchk.id[5])+7)]!="" && pcchk.id[0]=="B")){
					if(promotion[(parseInt(pcchk.id[5])-1)]=="Wqueen" || promotion[(parseInt(pcchk.id[5])+7)]=="Bqueen"){
						let lft=true,rght=true,up=true,dwn=true,uprght=true,uplft=true,dwnrght=true,dwnlft=true;
						for(let j=1;j<8;j++){
							let a="a",ch1="1",h="h",ch8="8";
							if(squares[i].id.charCodeAt(0)+j>h.charCodeAt(0) || tempMoveTo==squares[i]){
							//	console.log("1",tempMoveFrom,tempMoveTo);
								rght=false;
							}
							if(rght){
								let attksqr=document.getElementById(String.fromCharCode(squares[i].id.charCodeAt(0)+j)+squares[i].id[1]);
								if(pcchk.id[0]=="W" && promotion[(parseInt(pcchk.id[5])-1)]=="Wqueen"){
									attackedW.push(attksqr);
								}
								if(pcchk.id[0]=="B" && promotion[(parseInt(pcchk.id[5])+7)]=="Bqueen"){
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
								if(pcchk.id[0]=="W" && promotion[(parseInt(pcchk.id[5])-1)]=="Wqueen"){
									attackedW.push(attksqr);
								}
								if(pcchk.id[0]=="B" && promotion[(parseInt(pcchk.id[5])+7)]=="Bqueen"){
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
								if(pcchk.id[0]=="W" && promotion[(parseInt(pcchk.id[5])-1)]=="Wqueen"){
									attackedW.push(attksqr);
								}
								if(pcchk.id[0]=="B" && promotion[(parseInt(pcchk.id[5])+7)]=="Bqueen"){
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
								if(pcchk.id[0]=="W" && promotion[(parseInt(pcchk.id[5])-1)]=="Wqueen"){
									attackedW.push(attksqr);
								}
								if(pcchk.id[0]=="B" && promotion[(parseInt(pcchk.id[5])+7)]=="Bqueen"){
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
								if(pcchk.id[0]=="W" && promotion[(parseInt(pcchk.id[5])-1)]=="Wqueen"){
									attackedW.push(attksqr);
								}
								if(pcchk.id[0]=="B" && promotion[(parseInt(pcchk.id[5])+7)]=="Bqueen"){
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
								if(pcchk.id[0]=="W" && promotion[(parseInt(pcchk.id[5])-1)]=="Wqueen"){
									attackedW.push(attksqr);
								}
								if(pcchk.id[0]=="B" && promotion[(parseInt(pcchk.id[5])+7)]=="Bqueen"){
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
								if(pcchk.id[0]=="W" && promotion[(parseInt(pcchk.id[5])-1)]=="Wqueen"){
									attackedW.push(attksqr);
								}
								if(pcchk.id[0]=="B" && promotion[(parseInt(pcchk.id[5])+7)]=="Bqueen"){
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
								if(pcchk.id[0]=="W" && promotion[(parseInt(pcchk.id[5])-1)]=="Wqueen"){
									attackedW.push(attksqr);
								}
								if(pcchk.id[0]=="B" && promotion[(parseInt(pcchk.id[5])+7)]=="Bqueen"){
									attackedB.push(attksqr);
								}
								if((attksqr.innerHTML!="" && tempMoveFrom!=attksqr) || tempMoveTo==attksqr){
									dwnlft=false;										
								}
							}
						}
					}else if(promotion[(parseInt(pcchk.id[5])-1)]=="Wrook" || promotion[(parseInt(pcchk.id[5])+7)]=="Brook"){
						let lft=true,rght=true,up=true,dwn=true,uprght=true,uplft=true,dwnrght=true,dwnlft=true;
						for(let j=1;j<8;j++){
							let a="a",ch1="1",h="h",ch8="8";
							if(squares[i].id.charCodeAt(0)+j>h.charCodeAt(0) || tempMoveTo==squares[i]){
								rght=false;
							}
							if(rght){
								let attksqr=document.getElementById(String.fromCharCode(squares[i].id.charCodeAt(0)+j)+squares[i].id[1]);
								if(pcchk.id[0]=="W" && promotion[(parseInt(pcchk.id[5])-1)]=="Wrook"){
									attackedW.push(attksqr);
								}
								if(pcchk.id[0]=="B" && promotion[(parseInt(pcchk.id[5])+7)]=="Brook"){
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
								if(pcchk.id[0]=="W" && promotion[(parseInt(pcchk.id[5])-1)]=="Wrook"){
									attackedW.push(attksqr);
								}
								if(pcchk.id[0]=="B" && promotion[(parseInt(pcchk.id[5])+7)]=="Brook"){
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
								if(pcchk.id[0]=="W" && promotion[(parseInt(pcchk.id[5])-1)]=="Wrook"){
									attackedW.push(attksqr);
								}
								if(pcchk.id[0]=="B" && promotion[(parseInt(pcchk.id[5])+7)]=="Brook"){
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
								if(pcchk.id[0]=="W" && promotion[(parseInt(pcchk.id[5])-1)]=="Wrook"){
									attackedW.push(attksqr);
								}
								if(pcchk.id[0]=="B" && promotion[(parseInt(pcchk.id[5])+7)]=="Brook"){
									attackedB.push(attksqr);
								}
								if((attksqr.innerHTML!="" && tempMoveFrom!=attksqr) || tempMoveTo==attksqr){
									dwn=false;										
								}
							}
						}
					}else if(promotion[(parseInt(pcchk.id[5])-1)]=="Wbishop" || promotion[(parseInt(pcchk.id[5])+7)]=="Bbishop"){
						let lft=true,rght=true,up=true,dwn=true,uprght=true,uplft=true,dwnrght=true,dwnlft=true;
						for(let j=1;j<8;j++){
							let a="a",ch1="1",h="h",ch8="8";
							if(squares[i].id.charCodeAt(0)+j>h.charCodeAt(0) || squares[i].id.charCodeAt(1)+j>ch8.charCodeAt(0) || tempMoveTo==squares[i]){
								uprght=false;
							}
							if(uprght){
								let attksqr=document.getElementById(String.fromCharCode(squares[i].id.charCodeAt(0)+j)+String.fromCharCode(squares[i].id.charCodeAt(1)+j));
								if(pcchk.id[0]=="W" && promotion[(parseInt(pcchk.id[5])-1)]=="Wbishop"){
									attackedW.push(attksqr);
								}
								if(pcchk.id[0]=="B" && promotion[(parseInt(pcchk.id[5])+7)]=="Bbishop"){
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
								if(pcchk.id[0]=="W" && promotion[(parseInt(pcchk.id[5])-1)]=="Wbishop"){
									attackedW.push(attksqr);
								}
								if(pcchk.id[0]=="B" && promotion[(parseInt(pcchk.id[5])+7)]=="Bbishop"){
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
								if(pcchk.id[0]=="W" && promotion[(parseInt(pcchk.id[5])-1)]=="Wbishop"){
									attackedW.push(attksqr);
								}
								if(pcchk.id[0]=="B" && promotion[(parseInt(pcchk.id[5])+7)]=="Bbishop"){
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
								if(pcchk.id[0]=="W" && promotion[(parseInt(pcchk.id[5])-1)]=="Wbishop"){
									attackedW.push(attksqr);
								}
								if(pcchk.id[0]=="B" && promotion[(parseInt(pcchk.id[5])+7)]=="Bbishop"){
									attackedB.push(attksqr);
								}
								if((attksqr.innerHTML!="" && tempMoveFrom!=attksqr) || tempMoveTo==attksqr){
									dwnlft=false;										
								}
							}
						}
					}else if(promotion[(parseInt(pcchk.id[5])-1)]=="Wknight" || promotion[(parseInt(pcchk.id[5])+7)]=="Bknight" && tempMoveTo!=squares[i]){
						let a="a",ch1="1",h="h",ch8="8";
						if(pcchk.id[0]=="W" && promotion[(parseInt(pcchk.id[5])-1)]=="Wknight"){
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
						if(pcchk.id[0]=="B" && promotion[(parseInt(pcchk.id[5])-1)]=="Bknight"){
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

let promBqueen=document.getElementById("PromToBqueen");
promBqueen.onclick=function(){
	promotion[(parseInt(lstDrag.id[5])+7)]="Bqueen";
	let prmPc=document.getElementById(lstDrag.id);
	prmPc.src="Chess_qdt60.png";
	document.getElementById('BPromotion').style.pointerEvents = "none";
	document.getElementById('BPromotion').style.animation = "revAnim 0.3s linear";
	setTimeout(() => {
		document.getElementById('BPromotion').style.opacity="0%";
	}, 280);
}
let promBrook=document.getElementById("PromToBrook");
promBrook.onclick=function(){
	if(lstDrag.id[0]=="W"){
		promotion[(parseInt(lstDrag.id[5])-1)]="Wrook";
		let prmPc=document.getElementById(lstDrag.id);
		prmPc.src="Chess_rlt60.png";
	}
	if(lstDrag.id[0]=="B"){
		promotion[(parseInt(lstDrag.id[5])+7)]="Brook";
		let prmPc=document.getElementById(lstDrag.id);
		prmPc.src="Chess_rdt60.png";
	}
	document.getElementById('BPromotion').style.pointerEvents = "none";
	document.getElementById('BPromotion').style.animation = "revAnim 0.3s linear";
	setTimeout(() => {
		document.getElementById('BPromotion').style.opacity="0%";
	}, 280);
}
let promBbishop=document.getElementById("PromToBbishop");
promBbishop.onclick=function(){
	if(lstDrag.id[0]=="W"){
		promotion[(parseInt(lstDrag.id[5])-1)]="Wbishop";
		let prmPc=document.getElementById(lstDrag.id);
		prmPc.src="Chess_blt60.png";
	}
	if(lstDrag.id[0]=="B"){
		promotion[(parseInt(lstDrag.id[5])+7)]="Bbishop";
		let prmPc=document.getElementById(lstDrag.id);
		prmPc.src="Chess_bdt60.png";
	}
	document.getElementById('BPromotion').style.pointerEvents = "none";
	document.getElementById('BPromotion').style.animation = "revAnim 0.3s linear";
	setTimeout(() => {
		document.getElementById('BPromotion').style.opacity="0%";
	}, 280);
}
let promBknight=document.getElementById("PromToBknight");
promBknight.onclick=function(){
	if(lstDrag.id[0]=="W"){
		promotion[(parseInt(lstDrag.id[5])-1)]="Wknight";
		let prmPc=document.getElementById(lstDrag.id);
		prmPc.src="Chess_nlt60.png";
	}
	if(lstDrag.id[0]=="B"){
		promotion[(parseInt(lstDrag.id[5])+7)]="Bknight";
		let prmPc=document.getElementById(lstDrag.id);
		prmPc.src="Chess_ndt60.png";
	}
	document.getElementById('BPromotion').style.pointerEvents = "none";
	document.getElementById('BPromotion').style.animation = "revAnim 0.3s linear";
	setTimeout(() => {
		document.getElementById('BPromotion').style.opacity="0%";
	}, 280);
}
let promWqueen=document.getElementById("PromToWqueen");
promWqueen.onclick=function(){
	promotion[(parseInt(lstDrag.id[5])-1)]="Wqueen";
	let prmPc=document.getElementById(lstDrag.id);
	prmPc.src="Chess_qlt60.png";
	document.getElementById('WPromotion').style.pointerEvents = "none";
	document.getElementById('WPromotion').style.animation = "revAnim 0.3s linear";
	setTimeout(() => {
		document.getElementById('WPromotion').style.opacity="0%";
	}, 280);
}
let promWrook=document.getElementById("PromToWrook");
promWrook.onclick=function(){
	if(lstDrag.id[0]=="W"){
		promotion[(parseInt(lstDrag.id[5])-1)]="Wrook";
		let prmPc=document.getElementById(lstDrag.id);
		prmPc.src="Chess_rlt60.png";
	}
	document.getElementById('WPromotion').style.pointerEvents = "none";
	document.getElementById('WPromotion').style.animation = "revAnim 0.3s linear";
	setTimeout(() => {
		document.getElementById('WPromotion').style.opacity="0%";
	}, 280);
}
let promWbishop=document.getElementById("PromToWbishop");
promWbishop.onclick=function(){
	if(lstDrag.id[0]=="W"){
		promotion[(parseInt(lstDrag.id[5])-1)]="Wbishop";
		let prmPc=document.getElementById(lstDrag.id);
		prmPc.src="Chess_blt60.png";
	}
	document.getElementById('WPromotion').style.pointerEvents = "none";
	document.getElementById('WPromotion').style.animation = "revAnim 0.3s linear";
	setTimeout(() => {
		document.getElementById('WPromotion').style.opacity="0%";
	}, 280);
}
let promWknight=document.getElementById("PromToWknight");
promWknight.onclick=function(){
	if(lstDrag.id[0]=="W"){
		promotion[(parseInt(lstDrag.id[5])-1)]="Wknight";
		let prmPc=document.getElementById(lstDrag.id);
		prmPc.src="Chess_nlt60.png";
	}
	document.getElementById('WPromotion').style.pointerEvents = "none";
	document.getElementById('WPromotion').style.animation = "revAnim 0.3s linear";
	setTimeout(() => {
		document.getElementById('WPromotion').style.opacity="0%";
	}, 280);
}

function place(x_final, y_final) {
	if(isDrag){
		lstDrag=dragValue;
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
			let whole_name=squares[i].innerHTML;
			for(let k=0;(whole_name[k]>="a" && whole_name[k]<="z") || (whole_name[k]>="A" && whole_name[k]<="Z") || (whole_name[k]>="0" && whole_name[k]<="9");k++){
				pcstr=pcstr+whole_name[k]; 
			}
			if(pcstr==dragValue.id){
				fromsqr=squares[i];
			}
		}
		for(let i=0;i<64;i++){
			if(squares[i].getBoundingClientRect().x<=x_final && squares[i].getBoundingClientRect().left+squares[i].clientWidth>x_final && squares[i].getBoundingClientRect().top<=y_final && squares[i].getBoundingClientRect().top+squares[i].clientHeight>y_final){
				if(canGo(squares[i],true)){
					if(dragValue.id[1]=="p" && ((squares[i].id[1]=="8" && dragValue.id[0]=="W" && promotion[parseInt(dragValue.id[5])-1]=="") || (squares[i].id[1]=="1" && dragValue.id[0]=="B" && promotion[parseInt(dragValue.id[5])+7]==""))){
						if(dragValue.id[0]=="W"){
							document.getElementById('WPromotion').style.animation = "anim 0.3s linear";
							setTimeout(() => {
								document.getElementById('WPromotion').style.opacity="90%";
								document.getElementById('WPromotion').style.pointerEvents="all";
							}, 300);
						}
						if(dragValue.id[0]=="B"){
							document.getElementById('BPromotion').style.animation = "anim 0.3s linear";
							setTimeout(() => {
								document.getElementById('BPromotion').style.opacity="90%";
								document.getElementById('BPromotion').style.pointerEvents="all";
							}, 300);
						}
					}
					overABox=true;
					dragValue.style.left=squares[i].getBoundingClientRect().left+"px";
					dragValue.style.top=(squares[i].getBoundingClientRect().top+scrollY)+"px";
					squares[i].innerHTML=dragValue.id;
					fromsqr.innerHTML="";
					move++;
					if(WinPzl){
						let h=squares[i].getBoundingClientRect().height;
						let lf=squares[i].getBoundingClientRect().left;
						let tp=squares[i].getBoundingClientRect().top;
						let checkmark=document.getElementById("checkmark");
						checkmark.style.display="block";
						let hm=checkmark.getBoundingClientRect().height;
						console.log(hm);
						checkmark.style.left=(lf+h-(hm/2)-1.5)+"px";
						checkmark.style.top=(tp-(hm/2)-1.5)+"px";
						squares[i].style.height=(h-20)+"px";
						squares[i].style.width=(h-20)+"px";
						squares[i].style.border="10px solid #23c24e";
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
						let temp=dragValue;	
						let temp2=fromsqr;
						dragValue=pieceautomoved;
						fromsqr=automovedfrmsqr;
						canGo(automovedtosqr,true);
						dragValue=temp;
						fromsqr=temp2;
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
		if(!isPuzzle && mateCheck()){
			if(stalemate){
				emptDiv.innerHTML="stalemate"+emptDiv.innerHTML;
			}else{
				emptDiv.innerHTML="YOU WON!!!!!!"+emptDiv.innerHTML;
			}
		}
		attkUptd();
		/*for(let i=0;i<attackedB.length;i++){
			attackedB[i].style.backgroundColor="red";
		}*/
		
	}
}

function pointer(x,y){
	if(isDrag==true ){
		if((isPuzzle == false)||(move%2==1 && dragValue.id[0]=="W")||(move%2==0 && dragValue.id[0]=="B")){
			emptDiv.append(document.getElementById(dragValue.id));
			dragValue.style.left=(x-(dragValue.clientWidth/2))+"px";
			dragValue.style.top=(y-(dragValue.clientHeight/2))+"px";
		}
	}
}

document.addEventListener("mouseup", function(e){
	x = e.clientX;
	y = e.clientY;
	place(x,y);
});
document.addEventListener("touchend", function(e){
	e.preventDefault();
	x = e.changedTouches[0].clientX;
	y = e.changedTouches[0].clientY;
	place(x,y);
});

document.addEventListener("mousemove",function(e){
	let x=e.pageX;
	let y=e.pageY;
	pointer(x,y);
});
document.addEventListener("touchmove",function(e){
	e.preventDefault();
	let x=e.touches[0].pageX;
	let y=e.touches[0].pageY;
	pointer(x,y);
},{passive: false });
