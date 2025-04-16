let dragValue;
let stalemate=false;
let isDrag=false;
let isPuzzle=parseInt(document.currentScript.getAttribute('isPuzzle'));//пъзел ли е
let language = document.currentScript.getAttribute('lang')
let fromsqr;
let emptDiv=document.getElementById("emptyDiv");
let squares=document.querySelectorAll(".square");//+document.querySelectorAll(".Bsquare");
//let rows=document.querySelectorAll(".row");
let ovrSqr;
let hasMoved=[];
let enPass=[];
let corrm;
let move=1;// ако е пъзел 1-ти си белите, 2-ти си черните
if(!isPuzzle){
	puzzle_number = 0;
corrm={
	frm: [/*"",*/"g2","g7","f1","f8","g1","g8","e1","e8","a2","f6"],//ако си черените остави нулевия индекс празен (както съм го направил с коментара)
	to: [/*"",*/"g4","g5","h3","h6","f3","f6","g1","g8","a3","g4"],
};
}
else{
	switch (puzzle_number) {
	case 0: // daily puzzle
		corrm={
			frm: [/*"",*/"d1","c8","f7","c6","d8","b2","d7"],//ако си черените остави нулевия индекс празен (както съм го направил с коментара)
			to: [/*"",*/"d8","b7","c7","c7","d7","h2","c7"],
		}
		break;
	case 1:
		corrm={
			frm: [/*"",*/"g2","e7"],
			to: [/*"",*/"g4","e2"],
		};
		move=2;
		break;
	case 2:
		corrm={
			frm: [/*"",*/"g2","d4"],
			to: [/*"",*/"g4","d8"],
		};
		move=2;
		break;
	case 3:
		corrm={
			frm: [/*"",*/"g2","h6"],
			to: [/*"",*/"g4","a6"],
		};
		move=2;
		break;
	case 4:
		corrm={
			frm: [/*"",*/"c6"],
			to: [/*"",*/"c8"],
		};
		break;
	case 5:
		corrm={
			frm: [/*"",*/"g2","f7","b8","c7","h8","c1"],
			to: [/*"",*/"g4","c7","a8","c8","c8","c8"],
		};
		move=2;
		break;
	case 6:
		corrm={
			frm: [/*"",*/"g2","g1","d1","g8"],
			to: [/*"",*/"g4","g8","d8","d8"],
		};
		move=2;
		break;
	case 7:
		corrm={
			frm: [/*"",*/"h5","h7","g6"],
			to: [/*"",*/"g6","h8","h6"],
		};
		break;
	case 8:
		corrm={
			frm: [/*"",*/"g2","d2","b7","d5","a7","a5"],
			to: [/*"",*/"g4","a5","b6","b6","b6","a8"],
		};
		move=2;
		break;
	case 9:
		corrm={
			frm: [/*"",*/"g2","d2","e8","g5","d8","f5"],
			to: [/*"",*/"g4","g5","e7","e7","e7","e6"],
		};
		move=2;
		break;
	case 10:
		corrm={
			frm: [/*"",*/"g2","c5","b8","a6","a8","c7"],
			to: [/*"",*/"g4","a6","a8","c7","b8","e8"],
		};
		move=2;
		break;
	case 11:
		corrm={
			frm: [/*"",*/"g2","c5","b8","a6","a8","c7"],//ако си черените остави нулевия индекс празен (както съм го направил с коментара)
			to: [/*"",*/"g4","a6","a8","c7","b8","e8"],
		};
		break;
		move=2;
	case 12:
		corrm={
			frm: [/*"",*/"g2","c5","b8","a6","a8","c7"],//ако си черените остави нулевия индекс празен (както съм го направил с коментара)
			to: [/*"",*/"g4","a6","a8","c7","b8","e8"],
		};
		move=2;
	case 13:
		corrm={
			frm: [/*"",*/"g2","c5","b8","a6","a8","c7"],//ако си черените остави нулевия индекс празен (както съм го направил с коментара)
			to: [/*"",*/"g4","a6","a8","c7","b8","e8"],
		};
		move=2;
		break;
	case 14:
		corrm={
			frm: [/*"",*/"g2","c5","b8","a6","a8","c7"],//ако си черените остави нулевия индекс празен (както съм го направил с коментара)
			to: [/*"",*/"g4","a6","a8","c7","b8","e8"],
		};
		move=2;
		break;
	case 15:
		corrm={
			frm: [/*"",*/"g2","c5","b8","a6","a8","c7"],//ако си черените остави нулевия индекс празен (както съм го направил с коментара)
			to: [/*"",*/"g4","a6","a8","c7","b8","e8"],
		};
		move=2;
		break;
	case 16:
		corrm={
			frm: [/*"",*/"g2","c5","b8","a6","a8","c7"],//ако си черените остави нулевия индекс празен (както съм го направил с коментара)
			to: [/*"",*/"g4","a6","a8","c7","b8","e8"],
		};
		move=2;
		break;
	case 17:
		corrm={
			frm: [/*"",*/"g2","c5","b8","a6","a8","c7"],//ако си черените остави нулевия индекс празен (както съм го направил с коментара)
			to: [/*"",*/"g4","a6","a8","c7","b8","e8"],
		};
		move=2;
		break;
	case 18:
		corrm={
			frm: [/*"",*/"g2","c5","b8","a6","a8","c7"],//ако си черените остави нулевия индекс празен (както съм го направил с коментара)
			to: [/*"",*/"g4","a6","a8","c7","b8","e8"],
		};
		move=2;
		break;
	case 19:
		corrm={
			frm: [/*"",*/"g2","c5","b8","a6","a8","c7"],//ако си черените остави нулевия индекс празен (както съм го направил с коментара)
			to: [/*"",*/"g4","a6","a8","c7","b8","e8"],
		};
		move=2;
		break;
	case 20:
		corrm={
			frm: [/*"",*/"g2","c5","b8","a6","a8","c7"],//ако си черените остави нулевия индекс празен (както съм го направил с коментара)
			to: [/*"",*/"g4","a6","a8","c7","b8","e8"],
		};
		move=2;
		break;
}
}

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
let lstDrag;
let winDiv=document.getElementById("WinnerDiv");

gsap.set("#arrow_front",{x: "0",y: "-50vh"});
gsap.set("#arrow_back",{x: "0",y: "-50vh"});
gsap.set("#PuzzleNum",{x: "0",y: "-99vh"});
gsap.set("#retBut",{x: "0",y: "-111vh"});

if(puzzle_number == 0)
	for(let i=0;i<8;i++){
		//squares[(i*8)].style.marginLeft=(window.innerWidth-(0.8*window.innerHeight))/2+"px";//lol4
	}

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


function populate(place, piece){
	document.getElementById(place).innerHTML=piece + '<img class="piece" id="' + piece + '" src="Chess_' + (piece[2] == 'n' ? 'n' : piece[1]) + ({"B":"d","W":"l"})[piece[0]] + 't60.png">';
	// the image name consists of: Chess_ + (n -> knight or first letter) + (d for black, l for white) + t60.png
	drag(piece);
}

if(isPuzzle){
	switch(puzzle_number){
		case 1: populate("e8","Brook1"); populate("g8","Bking"); populate("e7","Bqueen"); populate("f7","Bpawn6"); populate("h7","Bpawn8"); populate("c6","Wqueen"); populate("f6","Bpawn4"); populate("c3","Wpawn3"); populate("f3","Wpawn2"); populate("a2","Wpawn1"); populate("e2","Wknight1"); populate("g2","Wpawn7"); populate("h2","Wpawn8"); populate("d1","Wrook1"); populate("e1","Wking"); populate("h1","Wrook2"); break;
		case 2: populate("b8","Wking"); populate("d8","Wrook1"); populate("f8","Wbishop1"); populate("g8","Wknight1"); populate("h8","Wrook2"); populate("a7","Wpawn1"); populate("b7","Wpawn2"); populate("f7","Wpawn3"); populate("g7","Wpawn4"); populate("h7","Wpawn5"); populate("c5","Bpawn7"); populate("e5","Wqueen"); populate("a4","Wbishop2"); populate("d4","Bqueen"); populate("a2","Bpawn1"); populate("b2","Bpawn2"); populate("c2","Bpawn3"); populate("e2","Bpawn4"); populate("g2","Bpawn5"); populate("h2","Bpawn6"); populate("a1","Brook1"); populate("d1","Bking"); populate("f1","Bbishop1"); populate("g1","Bknight1"); populate("h1","Brook2"); break;
		case 3: populate("c8","Wrook1"); populate("h6","Brook1"); populate("a5","Wking"); populate("c5","Bknight1"); populate("f5","Wpawn1"); populate("c4","Bking"); populate("f4","Wknight1"); populate("a3","Bpawn1"); break;
		case 4: populate("b8","Bking"); populate("a7","Bpawn1"); populate("d7","Brook1"); populate("g7","Bbishop1"); populate("a6","Wbishop1"); populate("b6","Bpawn2"); populate("c6","Wqueen"); populate("d6","Bqueen"); populate("f6","Bpawn4"); populate("e5","Bpawn3"); populate("h5","Bpawn5"); populate("g4","Bbishop2"); populate("h4","Wpawn5"); populate("a3","Wpawn1"); populate("b3","Wknight1"); populate("g3","Wpawn4"); populate("b2","Wpawn2"); populate("c2","Wpawn3"); populate("c1","Wking"); populate("h1","Wrook1"); break;
		case 5: populate("b8","Wking"); populate("h8","Wrook1"); populate("a7","Wpawn1"); populate("b7","Wpawn2"); populate("f7","Bqueen"); populate("h7","Wpawn4"); populate("d6","Wpawn3"); populate("b5","Wqueen"); populate("d5","Bpawn5"); populate("f5","Bpawn3"); populate("b3","Wrook2"); populate("b2","Bpawn1"); populate("f2","Bpawn2"); populate("g2","Bbishop1"); populate("h2","Bpawn4"); populate("b1","Bking"); populate("c1","Brook1"); break;
		case 6: populate("b8","Wking"); populate("a7","Wpawn1"); populate("b7","Wpawn2"); populate("c7","Wpawn3"); populate("e7","Wpawn4"); populate("f7","Wpawn5"); populate("h7","Wpawn6"); populate("e5","Bpawn4"); populate("c4","Bpawn3"); populate("f4","Wqueen"); populate("b3","Bpawn1"); populate("h3","Bpawn5"); populate("b2","Bking"); populate("c2","Bpawn2"); populate("d1","Wrook1"); populate("g1","Brook1"); break;
		case 7: populate("a8","Brook1"); populate("c8","Bbishop1"); populate("d8","Bqueen"); populate("a7","Bpawn1"); populate("b7","Bpawn2"); populate("c7","Bpawn3"); populate("f7","Wbishop1"); populate("h7","Bking"); populate("c6","Bknight1"); populate("d6","Bpawn4"); populate("h6","Bpawn6"); populate("c5","Bbishop2"); populate("d5","Bknight2"); populate("e5","Bpawn5"); populate("h5","Wqueen"); populate("e4","Wpawn5"); populate("d3","Wpawn4"); populate("a2","Wpawn1"); populate("b2","Wpawn2"); populate("c2","Wpawn3"); populate("f2","Wpawn6"); populate("g2","Wpawn7"); populate("h2","Wpawn8"); populate("a1","Wrook1"); populate("e1","Wking"); populate("h1","Wrook2"); break;
		case 8: populate("a8","Wrook1"); populate("d8","Wking"); populate("e8","Wqueen"); populate("h8","Wrook2"); populate("a7","Wpawn1"); populate("b7","Wpawn2"); populate("f7","Wpawn6"); populate("g7","Wpawn7"); populate("h7","Wpawn8"); populate("c6","Wpawn3"); populate("d6","Wpawn4"); populate("d5","Bknight1"); populate("e5","Wpawn5"); populate("d4","Wknight2"); populate("e4","Bpawn5"); populate("b3","Bbishop1"); populate("d3","Bpawn4"); populate("f3","Bpawn6"); populate("a2","Bpawn1"); populate("b2","Bpawn2"); populate("c2","Bpawn3"); populate("d2","Bqueen"); populate("e2","Wknight1"); populate("f2","Bpawn7"); populate("h2","Bpawn8"); populate("b1","Bking"); populate("e1","Brook2"); populate("h1","Brook1"); break;
		case 9: populate("a8","Wrook1"); populate("d8","Wking"); populate("e8","Wqueen"); populate("h8","Wrook2"); populate("a7","Wpawn1"); populate("b7","Wpawn2"); populate("c7","Wpawn3"); populate("g7","Wpawn6"); populate("h7","Wpawn7"); populate("c6","Wknight1"); populate("d6","Wpawn4"); populate("e6","Wbishop2"); populate("h6","Wknight2"); populate("e5","Wpawn5"); populate("f5","Bpawn8"); populate("g5","Wbishop1"); populate("a3","Bknight1"); populate("d3","Bpawn4"); populate("a2","Bpawn1"); populate("b2","Bpawn2"); populate("c2","Bpawn3"); populate("d2","Bqueen"); populate("f2","Bpawn5"); populate("g2","Bpawn6"); populate("h2","Bpawn7"); populate("a1","Brook1"); populate("d1","Bking"); populate("f1","Bbishop2"); populate("g1","Bknight2"); populate("h1","Brook2"); break;
		case 10: populate("b8","Wking"); populate("d8","Wrook1"); populate("e8","Wqueen"); populate("h8","Wrook2"); populate("b7","Wbishop2"); populate("e7","Wbishop1"); populate("g7","Wpawn4"); populate("h7","Wpawn5"); populate("a6","Wpawn1"); populate("b6","Bqueen"); populate("d6","Wknight1"); populate("f6","Wpawn3"); populate("c5","Bknight1"); populate("e5","Wpawn2"); populate("e4","Bpawn5"); populate("d3","Bpawn4"); populate("f3","Bknight2"); populate("h3","Bpawn7"); populate("a2","Bpawn1"); populate("b2","Bpawn2"); populate("c2","Bpawn3"); populate("g2","Bpawn6"); populate("b1","Bking"); populate("c1","Brook1"); populate("g1","Wknight2"); populate("h1","Brook2"); break;
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
		}else{
			return false;
		}
	}
	white_1 = move%2;      //1 ако белите са на ход, 0 - черните
	black_1 = 1 - white_1; //1 ако черните са на ход, 0 - белите
	player_now = dragValue.id[0]; //"W", ако е преместена бяла фигура, "B" - черна
	if(white_1) player_other = "B";
	if(black_1) player_other = "W";
	if((player_now=="W" && white_1) || (player_now=="B" && black_1)){
		tempMoveFrom=fromsqr;
		tempMoveTo=tosqr;
		attkUptd();
		for(let i=0;i<64;i++){
			let pcstr="";
			let whole_name=squares[i].innerHTML;
			for(let k=0;(whole_name[k]>="a" && whole_name[k]<="z") || (whole_name[k]>="A" && whole_name[k]<="Z") || (whole_name[k]>="0" && whole_name[k]<="9");k++){
				pcstr=pcstr+whole_name[k]; 
			}
			if((white_1 && attackedB.indexOf(squares[i])!=-1)||(black_1 && attackedW.indexOf(squares[i])!=-1)){
				if(((pcstr==player_now+"king" && tempMoveFrom!=squares[i]) || (dragValue==player_now+"king" && tempMoveTo==squares[i]))){
					return false;
				}
			}
		}
		tempMoveFrom=null;
		tempMoveTo=null;
		piece_now = dragValue.id[1];
		if(piece_now=="k") piece_now += dragValue.id[2]; // Differentiate between "ki" and "kn"
		if(piece_now=="p")/*Check for promotions*/{
			if(promotion[(parseInt(dragValue.id[5])-1+8*black_1)]!="") piece_now = (promotion[(parseInt(dragValue.id[5])-1+8*black_1)])[1];
			if(piece_now=="k") piece_now = "kn";
		}
		if(piece_now=="p")/*Pawn move*/{
			let pawn_number = parseInt(dragValue.id[5]);
			if(tosqr.id[0]==fromsqr.id[0] && tosqr.id[1]-"0"==fromsqr.id[1]-"0"+white_1-black_1 && tosqr.innerHTML==""){
				hasMoved[(pawn_number-1+8*black_1)]=true;
				return true;
			}
			if(!hasMoved[(pawn_number-1+8*black_1)] && tosqr.id[0]==fromsqr.id[0] && tosqr.id[1]-"0"==fromsqr.id[1]-"0"+2*white_1-2*black_1 && tosqr.innerHTML==""){
				let sq=document.getElementById(tosqr.id[0]+(tosqr.id[1]-white_1+black_1));
				if(sq.innerHTML==""){
					hasMoved[(pawn_number-1+8*black_1)]=true;
					enPass[(pawn_number-1+8*black_1)]=move;
					return true;
				}
			}
			if((tosqr.id.charCodeAt(0)==fromsqr.id.charCodeAt(0)+1 || tosqr.id.charCodeAt(0)==fromsqr.id.charCodeAt(0)-1) && tosqr.id[1]-"0"==fromsqr.id[1]-"0" + white_1 - black_1 && tosqr.innerHTML[0]==player_other){
				//console.log("ya");
				if(canTake){
					take(tosqr);
				}
				hasMoved[(pawn_number-1+8*black_1)]=true;
				return true;
			}
			if((tosqr.id.charCodeAt(0)==fromsqr.id.charCodeAt(0)+1 || tosqr.id.charCodeAt(0)==fromsqr.id.charCodeAt(0)-1) && tosqr.id[1]-"0"==fromsqr.id[1]-"0" + white_1 - black_1){
				//console.log("ya2");
				let sq=document.getElementById(tosqr.id[0]+fromsqr.id[1]);
				let pic=document.getElementById(sq.innerHTML);
				if(sq.innerHTML[0]==player_other && sq.innerHTML[1]=="p" && enPass[(parseInt(pic.id[5])-1+8*white_1)]==move-1){
					if(canTake){
						take(sq);
					}
					hasMoved[(pawn_number-1+8*black_1)]=true;
					return true;
				}
			}
			return false;
		}
		if(piece_now=="r" || piece_now=="q")/*Horizontal/vertical move*/{
			let rook_number;
			if(piece_now=="r") rook_number = parseInt(dragValue.id[5]);
			else rook_number = 0;
			if(tosqr.id[0]==fromsqr.id[0] && tosqr.id[1]!=fromsqr.id[1]){
				if(fromsqr.id[1]<tosqr.id[1]){
					for(let i=fromsqr.id.charCodeAt(1)+1;i<tosqr.id.charCodeAt(1);i++){
						let sq=document.getElementById(fromsqr.id[0]+String.fromCharCode(i));
						if(sq.innerHTML!=""){
							return false;
						}
					}
					if(tosqr.innerHTML[0]==player_other){
						if(canTake){
							take(tosqr);
						}
						if(rook_number) castleble[rook_number-1+2*black_1]=false;
						return true;
					}else if(tosqr.innerHTML==""){
						if(rook_number) castleble[rook_number-1+2*black_1]=false;
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
					if(tosqr.innerHTML[0]==player_other){
						if(canTake){
							take(tosqr);
						}
						if(rook_number) castleble[rook_number-1+2*black_1]=false;
						return true;
					}else if(tosqr.innerHTML==""){
						if(rook_number) castleble[rook_number-1+2*black_1]=false;
						return true;
					}
					return false;
				}
				console.log("broken");
				return false;
			}
			else if(tosqr.id[0]!=fromsqr.id[0] && tosqr.id[1]==fromsqr.id[1]){
				if(fromsqr.id[0]<tosqr.id[0]){
					for(let i=fromsqr.id.charCodeAt(0)+1;i<tosqr.id.charCodeAt(0);i++){
						let sq=document.getElementById(String.fromCharCode(i)+fromsqr.id[1]);
						if(sq.innerHTML!=""){
							return false;
						}
					}
					if(tosqr.innerHTML[0]==player_other){
						if(canTake){
							take(tosqr);
						}
						if(rook_number) castleble[rook_number-1+2*black_1]=false;
						return true;
					}else if(tosqr.innerHTML==""){
						if(rook_number) castleble[rook_number-1+2*black_1]=false;
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
					if(tosqr.innerHTML[0]==player_other){
						if(canTake){
							take(tosqr);
						}
						if(rook_number) castleble[rook_number-1+2*black_1]=false;
						return true;
					}else if(tosqr.innerHTML==""){
						if(rook_number) castleble[rook_number-1+2*black_1]=false;
						return true;
					}
					return false;
				}
				console.log("broken");
				return false;
			}
		}
		if(piece_now=="b" || piece_now=="q")/*Diagonal move*/{
			if(Math.abs(tosqr.id.charCodeAt(0)-fromsqr.id.charCodeAt(0))==Math.abs(tosqr.id[1]-fromsqr.id[1]) && fromsqr!=tosqr){
				if(fromsqr.id[0]<tosqr.id[0] && fromsqr.id[1]<tosqr.id[1]){
					for(let i=fromsqr.id.charCodeAt(0)+1,j=fromsqr.id.charCodeAt(1)+1;i<tosqr.id.charCodeAt(0);i++,j++){
						let sq=document.getElementById(String.fromCharCode(i)+String.fromCharCode(j));
						if(sq.innerHTML!=""){
							return false;
						}
					}
					if(tosqr.innerHTML[0]==player_other){
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
					if(tosqr.innerHTML[0]==player_other){
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
					if(tosqr.innerHTML[0]==player_other){
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
					if(tosqr.innerHTML[0]==player_other){
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
		if(piece_now=="kn")/*Knight move*/{
			if(((Math.abs(tosqr.id.charCodeAt(0)-fromsqr.id.charCodeAt(0))==2 && Math.abs(tosqr.id.charCodeAt(1)-fromsqr.id.charCodeAt(1))==1) || (Math.abs(tosqr.id.charCodeAt(0)-fromsqr.id.charCodeAt(0))==1 && Math.abs(tosqr.id.charCodeAt(1)-fromsqr.id.charCodeAt(1))==2)) && tosqr.innerHTML[0]!=player_now){
				if(tosqr.innerHTML[0]==player_other){
					if(canTake){
						take(tosqr);
					}
					return true;
				}else{
					return true;
				}
			}
		}
		if(piece_now=="ki")/*King move*/{
			if(white_1) myrow = "1";
			if(black_1) myrow = "8";
			if(fromsqr.id[1]==tosqr.id[1] && tosqr.id.charCodeAt(0)-fromsqr.id.charCodeAt(0)==2){
				let middlsqr=document.getElementById("f"+myrow);
				if(white_1) condition = (middlsqr.innerHTML=="" && tosqr.innerHTML=="" && attackedB.indexOf(middlsqr)==-1 && attackedB.indexOf(tosqr)==-1 && attackedB.indexOf(fromsqr)==-1)
				if(black_1) condition = (middlsqr.innerHTML=="" && tosqr.innerHTML=="" && attackedW.indexOf(middlsqr)==-1 && attackedW.indexOf(tosqr)==-1 && attackedW.indexOf(fromsqr)==-1)
				if(condition){
					if(castleble[1+2*black_1]==true && castleble[4+black_1]==true){
						let rook=document.getElementById(player_now+"rook2");
						if(white_1) emptDiv.append(document.getElementById(Wrook2.id));
						if(black_1) emptDiv.append(document.getElementById(Brook2.id));
						rook.style.left=middlsqr.getBoundingClientRect().left+"px";
						rook.style.top=(middlsqr.getBoundingClientRect().top+scrollY)+"px";
						middlsqr.innerHTML=player_now+"rook2";
						document.getElementById("h"+myrow).innerHTML="";
						return true;
					}
				}
			}
			if(fromsqr.id[1]==tosqr.id[1] && fromsqr.id.charCodeAt(0)-tosqr.id.charCodeAt(0)==2){
				let middlsqr=document.getElementById("d"+myrow);
				let lftsqr=document.getElementById("b"+myrow);
				if(white_1) condition = (middlsqr.innerHTML=="" && tosqr.innerHTML=="" && lftsqr.innerHTML=="" && attackedB.indexOf(middlsqr)==-1 && attackedB.indexOf(tosqr)==-1 && attackedB.indexOf(lftsqr)==-1 && attackedB.indexOf(fromsqr)==-1);
				if(black_1) condition = (middlsqr.innerHTML=="" && tosqr.innerHTML=="" && lftsqr.innerHTML=="" && attackedW.indexOf(middlsqr)==-1 && attackedW.indexOf(tosqr)==-1 && attackedW.indexOf(lftsqr)==-1 && attackedW.indexOf(fromsqr)==-1)
				if(condition){
					if(castleble[2*black_1]==true && castleble[4+black_1]==true){
						let rook=document.getElementById(player_now+"rook1");
						if(white_1) emptDiv.append(document.getElementById(Wrook1.id));
						if(black_1) emptDiv.append(document.getElementById(Brook1.id));
						rook.style.left=middlsqr.getBoundingClientRect().left+"px";
						rook.style.top=(middlsqr.getBoundingClientRect().top+scrollY)+"px";
						middlsqr.innerHTML=player_now+"rook1";
						document.getElementById("a"+myrow).innerHTML="";
						return true;
					}
				}
			}
			if(white_1) condition = (attackedB.indexOf(tosqr)==-1);
			if(black_1) condition = (attackedW.indexOf(tosqr)==-1);
			if(condition && (Math.abs(tosqr.id.charCodeAt(0)-fromsqr.id.charCodeAt(0))<=1 && Math.abs(tosqr.id.charCodeAt(1)-fromsqr.id.charCodeAt(1))<=1) && fromsqr!=tosqr && tosqr.innerHTML[0]!=player_now){
					if(tosqr.innerHTML[0]==player_other){
						if(canTake){
							take(tosqr);
						}
						castleble[4+black_1]=false;
						return true;
					}else{
						castleble[4+black_1]=false;
						return true;
					}
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
			let piece_color = pcstr[0];
			let c0 = squares[i].id.charCodeAt(0); // UTF-16 code of the row.
			let c1 = squares[i].id.charCodeAt(1); // UTF-16 code of the column.
			let a="a".charCodeAt(0); //Leftmost column. Used in the conditionals to specify the boundary.
			let h="h".charCodeAt(0); //Rightmost column
			let ch1="1".charCodeAt(0); //Bottom row
			let ch8="8".charCodeAt(0); //Top row
			let pcchk=document.getElementById(pcstr);
			if(pcstr[1]=="p" && tempMoveTo!=squares[i])/*Pawn*/{
				if     (promotion[(parseInt(pcstr[5])-1)]!="" && piece_color=="W") pcstr = promotion[(parseInt(pcstr[5])-1)];
				else if(promotion[(parseInt(pcstr[5])+7)]!="" && piece_color=="B") pcstr = promotion[(parseInt(pcstr[5])+7)];
				else{//Real pawn
					if(piece_color=="W"){
						if(c0+1<=h && c1+1<=ch8) add_attack('W',c0+1,c1+1);
						if(c0-1>=a && c1+1<=ch8) add_attack('W',c0-1,c1+1);
					}
					if(piece_color=="B"){
						if(c0+1<=h && c1-1>=ch1) add_attack('B',c0+1,c1-1);
						if(c0-1>=a && c1-1>=ch1) add_attack('B',c0-1,c1-1);
					}
				}
			}
			if((pcstr[1]=="r" || pcstr[1]=="q") && tempMoveTo!=squares[i])/*Diagonal*/{
				let lft=true,rght=true,up=true,dwn=true,uprght=true,uplft=true,dwnrght=true,dwnlft=true;
				for(let j=1;j<8;j++){
					if(c0+j>h || tempMoveTo==squares[i]){
						rght=false;
					}
					if(rght){
						let attksqr=document.getElementById(String.fromCharCode(c0+j)+squares[i].id[1]);
						add_attack(piece_color,c0+j,c1);
						if((attksqr.innerHTML!="" && tempMoveFrom!=attksqr) || tempMoveTo==attksqr){
							rght=false;										
						}
					}
					if(c0-j<a || tempMoveTo==squares[i]){
						lft=false;
					}
					if(lft){
						let attksqr=document.getElementById(String.fromCharCode(c0-j)+squares[i].id[1]);
						add_attack(piece_color,c0-j,c1);
						if((attksqr.innerHTML!="" && tempMoveFrom!=attksqr) || tempMoveTo==attksqr){
							lft=false;										
						}
					}
					if(c1+j>ch8 || tempMoveTo==squares[i]){
						up=false;
					}
					if(up){
						let attksqr=document.getElementById(squares[i].id[0]+String.fromCharCode(c1+j));
						add_attack(piece_color,c0,c1+j);
						if((attksqr.innerHTML!="" && tempMoveFrom!=attksqr) || tempMoveTo==attksqr){
							up=false;										
						}
					}
					if(c1-j<ch1 || tempMoveTo==squares[i]){
						dwn=false;
					}
					if(dwn){
						let attksqr=document.getElementById(squares[i].id[0]+String.fromCharCode(c1-j));
						add_attack(piece_color,c0,c1-j);
						if((attksqr.innerHTML!="" && tempMoveFrom!=attksqr) || tempMoveTo==attksqr){
							dwn=false;										
						}
					}
				}
			}
			if((pcstr[1]=="b" || pcstr[1]=="q") && tempMoveTo!=squares[i])/*Horizontal / vertical*/{
				let lft=true,rght=true,up=true,dwn=true,uprght=true,uplft=true,dwnrght=true,dwnlft=true;
				for(let j=1;j<8;j++){
					if(c0+j>h || c1+j>ch8 || tempMoveTo==squares[i]){
						uprght=false;
					}
					if(uprght){
						let attksqr=document.getElementById(String.fromCharCode(c0+j)+String.fromCharCode(c1+j));
						add_attack(piece_color,c0+j,c1+j);
						if((attksqr.innerHTML!="" && tempMoveFrom!=attksqr) || tempMoveTo==attksqr){
							uprght=false;										
						}
					}
					if(c0-j<a || c1+j>ch8 || tempMoveTo==squares[i]){
						uplft=false;
					}
					if(uplft){
						let attksqr=document.getElementById(String.fromCharCode(c0-j)+String.fromCharCode(c1+j));
						add_attack(piece_color,c0-j,c1+j);
						if((attksqr.innerHTML!="" && tempMoveFrom!=attksqr) || tempMoveTo==attksqr){
							uplft=false;										
						}
					}
					if(c0+j>h || c1-j<ch1 || tempMoveTo==squares[i]){
						dwnrght=false;
					}
					if(dwnrght){
						let attksqr=document.getElementById(String.fromCharCode(c0+j)+String.fromCharCode(c1-j));
						add_attack(piece_color,c0+j,c1-j);
						if((attksqr.innerHTML!="" && tempMoveFrom!=attksqr) || tempMoveTo==attksqr){
							dwnrght=false;										
						}
					}
					if(c0-j<a || c1-j<ch1 || tempMoveTo==squares[i]){
						dwnlft=false;
					}
					if(dwnlft){
						let attksqr=document.getElementById(String.fromCharCode(c0-j)+String.fromCharCode(c1-j));
						add_attack(piece_color,c0-j,c1-j);
						if((attksqr.innerHTML!="" && tempMoveFrom!=attksqr) || tempMoveTo==attksqr){
							dwnlft=false;										
						}
					}
				}
			}
			if(pcstr[1]=="k" && pcstr[2]=="n" && tempMoveTo!=squares[i])/*Knight*/{
				if(c0+2<=h && c1+1<=ch8) add_attack(piece_color, c0+2, c1+1);
				if(c0+2<=h && c1-1>=ch1) add_attack(piece_color, c0+2, c1-1);
				if(c0-2>=a && c1+1<=ch8) add_attack(piece_color, c0-2, c1+1);
				if(c0-2>=a && c1-1>=ch1) add_attack(piece_color, c0-2, c1-1);
				if(c0+1<=h && c1+2<=ch8) add_attack(piece_color, c0+1, c1+2);
				if(c0+1<=h && c1-2>=ch1) add_attack(piece_color, c0+1, c1-2);
				if(c0-1>=a && c1+2<=ch8) add_attack(piece_color, c0-1, c1+2);
				if(c0-1>=a && c1-2>=ch1) add_attack(piece_color, c0-1, c1-2);
			}
			if(pcstr[1]=="k" && pcstr[2]=="i"){
				if(c0+1<=h && c1+1<=ch8) add_attack(piece_color, c0+1, c1+1);
				if(c0+1<=h && c1-1>=ch1) add_attack(piece_color, c0+1, c1-1);
				if(c0-1>=a && c1+1<=ch8) add_attack(piece_color, c0-1, c1+1);
				if(c0-1>=a && c1-1>=ch1) add_attack(piece_color, c0-1, c1-1);
				if(c1+1<=ch8) add_attack(piece_color, c0, c1+1);
				if(c1-1>=ch1) add_attack(piece_color, c0, c1-1);
				if(c0+1<=h) add_attack(piece_color, c0+1, c1);
				if(c0-1>=a) add_attack(piece_color, c0-1, c1);
			}
		}
	}
}

function add_attack(color, row, column){
	/*Add a square to the list of attacked squares. 'row' and 'column' are the UTF-16 code of the row and column symbols.*/
	if(color=="W"){attackedW.push(document.getElementById(String.fromCharCode(row)+String.fromCharCode(column)));}
	if(color=="B"){attackedB.push(document.getElementById(String.fromCharCode(row)+String.fromCharCode(column)));}
}

document.getElementById("PromToBqueen" ).addEventListener('click', function(){ prom("B","queen", 1,"d","q");});
document.getElementById("PromToBrook"  ).addEventListener('click', function(){ prom("B","rook",  1,"d","r");});
document.getElementById("PromToBbishop").addEventListener('click', function(){ prom("B","bishop",1,"d","b");});
document.getElementById("PromToWknight").addEventListener('click', function(){ prom("B","knight",1,"d","n");});
document.getElementById("PromToWqueen" ).addEventListener('click', function(){ prom("W","queen", 0,"l","q");});
document.getElementById("PromToWrook"  ).addEventListener('click', function(){ prom("W","rook",  0,"l","r");});
document.getElementById("PromToWbishop").addEventListener('click', function(){ prom("W","bishop",0,"l","b");});
document.getElementById("PromToWknight").addEventListener('click', function(){ prom("W","knight",0,"l","n");});
document.getElementById("PromToBqueen" ).addEventListener('touchstart', function(){ prom("B","queen", 1,"d","q");});
document.getElementById("PromToBrook"  ).addEventListener('touchstart', function(){ prom("B","rook",  1,"d","r");});
document.getElementById("PromToBbishop").addEventListener('touchstart', function(){ prom("B","bishop",1,"d","b");});
document.getElementById("PromToWknight").addEventListener('touchstart', function(){ prom("B","knight",1,"d","n");});
document.getElementById("PromToWqueen" ).addEventListener('touchstart', function(){ prom("W","queen", 0,"l","q");});
document.getElementById("PromToWrook"  ).addEventListener('touchstart', function(){ prom("W","rook",  0,"l","r");});
document.getElementById("PromToWbishop").addEventListener('touchstart', function(){ prom("W","bishop",0,"l","b");});
document.getElementById("PromToWknight").addEventListener('touchstart', function(){ prom("W","knight",0,"l","n");});

function prom(prom_player, prom_piece, prom_player_number, prom_player_letter, prom_piece_letter){
	promotion[(parseInt(lstDrag.id[5])-1+8*prom_player_number)]=prom_player+prom_piece;
	let prmPc=document.getElementById(lstDrag.id);
	prmPc.src="Chess_"+prom_piece_letter+prom_player_letter+"t60.png";
	document.getElementById(prom_player+'Promotion').style.pointerEvents = "none";
	document.getElementById(prom_player+'Promotion').style.animation = "revAnim 0.3s linear";
	setTimeout(() => {
		document.getElementById(prom_player+'Promotion').style.opacity="0%";
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
						checkmark.style.top=(tp-(hm/2)-1.5+scrollY)+"px";
						//checkmark.style.top=(tp-(hm/2)-1.5
						squares[i].style.height=(h-20)+"px";
						squares[i].style.width=(h-20)+"px";
						squares[i].style.border="10px solid #23c24e";
						//emptDiv.innerHTML="YOU WON pzzl!!!!!!"+emptDiv.innerHTML; //(in puzzles 11+)
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
						if(automovedtosqr.innerHTML!=""){
							take(automovedtosqr);
						}
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
			for(let i=0;i<64;i++){
				let pcstr="";
				let whole_name=squares[i].innerHTML;
				for(let k=0;(whole_name[k]>="a" && whole_name[k]<="z") || (whole_name[k]>="A" && whole_name[k]<="Z") || (whole_name[k]>="0" && whole_name[k]<="9");k++){
					pcstr=pcstr+whole_name[k]; 
				}
				if(pcstr!=""){
					let retpc=document.getElementById(pcstr);
					squares[i].append(document.getElementById(pcstr));
					retpc.style.left=squares[i].style.left;
					retpc.style.top=squares[i].style.top;
				}
			}
			//let RestartBut=document.getElementById("resBut");
			//RestartBut.style.display="flex";
			if(stalemate){
				if(language = 'bg')	winDiv.innerHTML="Пат";
				if(language = 'en') winDiv.innerHTML="Stalemate";
			}else{
				if(Wcheck){
					if(language = 'bg') winDiv.innerHTML="Белите Печелят!";
					if(language = 'en') winDiv.innerHTML="White Wins!";
				}else{
					if(language = 'bg') winDiv.innerHTML="Черните Печелят!";
					if(language = 'en') winDiv.innerHTML="Black Wins!";
				}
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
