let seuVotoPara= document.querySelector ('.d-1-1 span');
let artista = document.querySelector ('.d-1-2 span');
let descricao = document.querySelector( '.d-1-4');
let aviso = document.querySelector('.d-2');
let lateral = document.querySelector ('.d-1-right');
let numeros= document.querySelector ('.d-1-3');

let etapaAtual= 0;
let numero = ''; // variável que salva os números
let votoBranco = false; // preencher
let votos = [];


function comecarEtapa(){
	let etapa = etapas[etapaAtual];
	
  // variavel de ambiente
	let numeroHtml ='';
	   numero = '';
	let votoBranco = false;

	for (let i=0;i <etapa.numeros; i++){ //no fim desse loop terá 2 elementos de numero html
		if (i===0){
			numeroHtml += '<div class = "numero pisca"></div>'; // coloca o piscar no próximo número
		} else {
		numeroHtml += '<div class = "numero"></div>';
	}
}

	seuVotoPara.style.display = 'none';
	artista.innerHTML = etapa.titulo;
	descricao.innerHTML = '';
	aviso.style.display = 'none';
	lateral.innerHTML = '';
	numeros.innerHTML = numeroHtml;

}

function atualizaInterface (){
	let etapa = etapas[etapaAtual];
	// verificar se o número digitado corresponde a algum candidato
	let candidato = etapa.candidatos.filter((item)=>{ // recebe os candidatos
		if(item.numero === numero){ //
			return true;
		} else {
			return false;
		}
	
	});

// Se encontrou
if (candidato.length > 0) {
    candidato = candidato[0];
    seuVotoPara.style.display = "block";
    descricao.innerHTML = `Nome: ${candidato.nome}`;
    aviso.style.display = "block";

    let fotosHtml = "";
    for (let i in candidato.foto) {
      fotosHtml += `<div class="d-1-image">
          <img src="Imagens/${candidato.foto[i].url}" alt="${candidato.foto[i].legenda}">
          <p>${candidato.foto[i].legenda}</p></div>`;
    }

    lateral.innerHTML = fotosHtml;
    }else {
	seuVotoPara.style.display = 'block';
	aviso.style.display = 'block';
	descricao.innerHTML = '<div class="aviso--grande">VOTO NULO</div>';

        }

      }
      


function clicou(n){
	// busca o quadrado que está com o pisca ativado, pois é
	//nele que o número será preenchido
	let elNumero = document.querySelector('.numero.pisca');
	if (elNumero !== null){ // se sim ele vai preencher 
		elNumero.innerHTML = n;
		numero = `${numero}${n}`;
        
        //quando preencher um número, remove o pisca
		elNumero.classList.remove('pisca');
		
		// verifica se exite um próximo elemento
		if (elNumero.nextElementSibling!== null){ //significa que chegou no último item
		
		// pega o próximo elemento,entra no class List e adiciona
		elNumero.nextElementSibling.classList.add('pisca');
		

         } else {
         	atualizaInterface();
         	//verifica o número digitado, se tem algum elemento com esse número,pega as informações e mostra na tela

         }

	}
}


function branco (){
	if (numero=== ''){
		votoBranco = true;
		seuVotoPara.style.display = "block";
		aviso.style.display = "block";
		numeros.innerHTML = '';
		descricao.innerHTML = '<div class="aviso--grande">VOTO EM BRANCO</div>';


}
}
function corrige () {
	comecarEtapa();
}

function confirma () {
 let etapa = etapas[etapaAtual];

 let votoConfirmado = false;

 if (votoBranco === true){
 	votoConfirmado = true;
 	votos.push({
 		etapa: etapas[etapaAtual].titulo,
 		voto: 'branco'
 	});
 	alert ("Confirmando como voto em branco");
 } else if (numero.length === etapa.numeros){
 	votoConfirmado = true;
 	votos.push({
 		etapa: etapas[etapaAtual].titulo,
 		voto: numero
 	});
 	alert ("Confirmando como " +numero);
 }
 if (votoConfirmado){
 	etapaAtual++;
 	if(etapas[etapaAtual] !== undefined){
 		comecarEtapa();

 	} else {
 		document.querySelector('.tela').innerHTML= '<div class="aviso--gigante">FIM</div>';


 		console.log ("FIM!");
 		console.log (votos);

 }
 
}
}
comecarEtapa();