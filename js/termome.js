var canvas = document.getElementById("termome");
var valor1 = canvas.getAttributeNode("data-valor").value;
var maxim = canvas.getAttributeNode("data-max").value;
var valor = valor1 / maxim;
var ctx = canvas.getContext("2d");
var alto = canvas.height * 0.9;
var radio = canvas.width / 2;
var grad;
var lado;
ctx.translate(radio, parseInt(alto-radio));
radio = radio * 0.6;
alto = alto*0.75;
var ancho = radio / 2;
var ymin = radio * 1.2;
var ymax = alto + ancho;
var yinc = (ymax-ymin) / 10;
var xx1 = 0;
var xxinc = parseInt(valor1 / 50);
if (xxinc == 0) xxinc = 1;
var AA = setInterval(DibujaTermo, 20);

function DibujaTermo() {
	valor = xx1 / maxim;
	ctx.fillStyle = '#fff';
	ctx.fillRect(-alto*4, -alto*4, alto*8, alto*8);
	DibujaTubo();
	DibujaBola();
	xx1 += xxinc;
	if (xx1 > valor1) {
		xx1 = valor1;
		ctx.fillStyle = '#fff';
	    ctx.fillRect(-alto*4, -alto*4, alto*8, alto*8);
		DibujaTubo();
		DibujaBola();
		clearInterval(AA);
	};
};

function DibujaTubo(){
	var y1 = -(ymin + (yinc*10*valor));
	
	//Dibuja Tubo Lleno
	grad = ctx.createLinearGradient(-ancho, 0, ancho, 0);
	grad.addColorStop(0, '#d00');
	grad.addColorStop(0.5, '#f40');
	grad.addColorStop(1,'#d00');
	ctx.fillStyle = grad;
	ctx.fillRect(-ancho, -ancho, ancho*2, y1);
	
	//Dibuja Tubo Vacio
	grad = ctx.createLinearGradient(-ancho, 0, ancho, 0);
	grad.addColorStop(0, '#ddd');
	grad.addColorStop(0.5, '#fff');
	grad.addColorStop(1,'#ddd');
	ctx.fillStyle = grad;
	ctx.fillRect(-ancho, y1, ancho*2, -(alto+ancho+y1));
	
	//Dibuja Cupula
	grad = ctx.createRadialGradient( ancho*0.1, -(alto + ancho*0.3), 0, ancho*0.1, -(alto + ancho*0.3), ancho*1.8 );
	grad.addColorStop(0, '#fff');
	grad.addColorStop(1, '#ddd');
	ctx.fillStyle = grad;
	ctx.beginPath();
	ctx.arc(0, -(alto+ancho), ancho, Math.PI, 2*Math.PI);
	ctx.fill();
};

function DibujaBola() {
	grad = ctx.createRadialGradient(ancho*0.2, -ancho, 0, ancho*0.2, -ancho, radio*1.1);
	grad.addColorStop(0, '#f40');
	grad.addColorStop(1, '#d00');
	ctx.fillStyle = grad;
	ctx.beginPath();
	ctx.arc(0,0, radio, 0, 2*Math.PI);
	ctx.fill();
	
	// Borde del Termometro
	ctx.strokeStyle = "#333";
	ctx.strikeWidth = 4;
	ctx.beginPath();
	ctx.arc(0,0, radio*1.1, -0.31*Math.PI, 1.3*Math.PI);
	ctx.lineTo(-ancho*1.2,-alto*1.05);
	ctx.arc(0, -(ancho+alto), ancho*1.2, Math.PI, 2*Math.PI);
	ctx.lineTo(ancho*1.2, -ancho*1.9);
	ctx.closePath();
	ctx.stroke();
	
	// Marcas de Medición
	var i = 0;
	var val2 = maxim / 10;
	var y = -ymin;
	for (i=0; i<=10; i++) {
		y = -(ymin + (yinc * i));
		ctx.strokeStyle = '#333';
		ctx.strikeWidth = 4;
		ctx.beginPath();
		ctx.moveTo(-ancho*1.2, y);
		ctx.lineTo(0, y);
		ctx.stroke();
		ctx.font = radio*0.32 + "px calibri";
		ctx.textBaseline="middle";
		ctx.textAlign="center";
		ctx.fillStyle = '#000';
		ctx.fillText(i*val2 + "%", -radio*1.1, y);
	};
	
	// Escribe Valor
	ctx.font = radio*0.8 + "px calibri";
	ctx.fillStyle = '#000';
	ctx.fillText(xx1 + "%", 0, 0);
	ctx.fillText("KPI", 0, radio*1.6);
	ctx.fillText("% Compl.", 0, radio*2.4);

};
