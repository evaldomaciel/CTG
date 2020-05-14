var inicio = 4;
var receberDoc = 5;
var informarRetencao = 16;
var verificarNeg = 19;
var difal = 31;
var preencheDados = 39;
var ajustarInfos = 50;
var final9 = 9;

$(document).ready(function () {

	var view = $('#WKMode').val();
	console.log("view: " +  view);
	var atividade = parseInt($('#campo_processo').val());
	if (atividade == ajustarInfos) {
		atividade = inicio;	}
	$('#ErroRecebData').hide();
	$('#ErroVencData').hide();
	$('#ErroEmissData').hide();
	$('#ErroForn').hide();
	$('#RecebData').mask('99/99/9999');
	$('#VencData').mask('99/99/9999');
	$('#EmissData').mask('99/99/9999');
	$('.competencia').mask('99/9999');
	$('#cCPF').mask('999.999.999-99', { reverse: true });
	//$('.maskValor').mask('#,##9.99', { reverse: true });
	$('.maskValor').mask('#.##9,99', { reverse: true });
	$('#btZoomEmpresa').hide();
	$('#btZoomFornecedor').hide();
	$('#imprime').show();
	$('#taxVerif').hide();
	$('#retencoesImpostos').hide();
	$('#negativaFinanceiro').hide();

	$('#lembrete').hide();
	$('#btZoomPass').hide();
	$('#VencData').on('change', function () {
		var data = $(this).val().split('/');
		data = new Date(data[2], data[1] - 1, data[0]);
		EmissData.setMaxDate(data);
	});
	$('#EmissData').on('change', function () {
		var data = $(this).val().split('/');
		data = new Date(data[2], data[1] - 1, data[0]);
		vencData.setMinDate(data);
	});

	var mySimpleCalendar = FLUIGC.calendar('.competencia');
	FLUIGC.calendar.formatDate(new Date(), 'DD/MM/YYYY', 'pt');

	$("#competencia").on("change", function(){
		var competenciaA = $("#competencia").val().split('/');
		setTimeout(() => {
			$("#competencia").val(competenciaA[1] + "/" + competenciaA[2]);			
		}, 300);
	});

	if (view != "VIEW") {

		var recebData = FLUIGC.calendar('#RecebData');
		var vencData = FLUIGC.calendar('#VencData');
		var EmissData = FLUIGC.calendar('#EmissData');
		$('#codFilial').on('change', function () {
			$('#cCentroCusto').val('');
			$('#descCentroCusto').val('');
			$('#cContaOrc').val('');
			$('#descContaOrc').val('');
			$('#WKsuperior').val('');
			$('#aproverName').val('');
			$('#cCodForn').val('');
			$('#clojaForn').val('');
			$('#CodForn').val('');
			$('#detailFornecedor').val('');
		});
		$('#rb_aprovaFinanceiro_nao').on('click', (e) => {
			$('#negativaFinanceiro').show();
			$('input[name="retornoFinOpt"]').addClass('has-free');
		});
		$('#retornoFinOpt').on('click', (e) => {
			$('input[name="retornoFinOpt"]').removeClass('has-free');
		});
		$('#imprime').hide();
		//if(atividade == verificarNeg){atividade =inicio;}
		switch (atividade) {
			case verificarNeg:
				$('#btZoomEmpresa').show();
				$('#btZoomFornecedor').show();
				$('#financeiro').hide();
				$('#taxVerif').hide();
				$('#lembrete').show();
				if ($('#_rb_aprovaFinanceiro_nao').is(':checked') || $('#rb_aprovaFinanceiro_nao').is(':checked')) {
					$('#financeiro').show();
				}
				if ($('#_rb_aprovaFiscal_nao').is(':checked') || $('#rb_aprovaFiscal_nao').is(':checked')) {
					$('#taxVerif').show();
				}

				break;
			case inicio:
				$('#btZoomEmpresa').show();
				$('#btZoomFornecedor').show();
				$('#financeiro').hide();
				$('#taxVerif').hide();
				$('#difal').hide();
				$('#lembrete').show();
				break;
			case preencheDados:
				$('#btZoomEmpresa').show();
				$('#btZoomFornecedor').show();
				$('#financeiro').hide();
				$('#taxVerif').hide();
				$('#difal').hide();
				$('#lembrete').show();
				$('#acptSol').show();
				$('#option').hide();
				$('#formReverso').show();
				$('#obsReverso').attr("readonly", 'readonly');
				$('#obsAcptSol').val('');
				setDivReadOnly(["formReverso"]);
				break;
			case informarRetencao:

				$('#taxVerif').show();
				$('#financeiro').hide();
				$('#difal').hide();
				break;
			case difal:
				$('#difal').show();
				$('#taxVerif').hide();
				$('#financeiro').hide();
				break;
			case receberDoc:
				if ($('#_rb_tipoPgmto_serv').is(':checked') || $('#rb_tipoPgmto_serv').is(':checked')) {
					$('#taxVerif').show();
					if ($('#rb_retencao_sim').is(':checked') || $('#_rb_retencao_sim').is(':checked') &&
						$('#_rb_aprovaFiscal_sim').is(':checked') || $('#rb_aprovaFiscal_sim').is(':checked')) {
						$('#retencoesImpostos').show();
					}
					$('#difal').hide();
				} else {
					$('#difal').show();
					$('#taxVerif').hide();
				}
				$('#financeiro').show();
				break;
			case final9:
				if ($('#_rb_tipoPgmto_serv').is(':checked') || $('#rb_tipoPgmto_serv').is(':checked')) {
					$('#taxVerif').show();
					if ($('#rb_retencao_sim').is(':checked') || $('#_rb_retencao_sim').is(':checked') &&
						$('#_rb_aprovaFiscal_sim').is(':checked') || $('#rb_aprovaFiscal_sim').is(':checked')) {
						$('#retencoesImpostos').show();
					}
					$('#difal').hide();
				} else {
					$('#difal').show();
					$('#taxVerif').hide();
				}
				$('#financeiro').show();
				break;
		}
		debugger;

	} /* aqui acaba o MOD e entra view */  else {
		$('#lembrete').hide();
		$('#btZoomEmpresa').hide();
		$('#btZoomFornecedor').hide();
		if ($('#_rb_tipoPgmto_serv').is(':checked') == true || $('#rb_tipoPgmto_serv').is(':checked')  == true) {
			console.log("_rb_tipoPgmto_serv == true");
			$('#taxVerif').show();
			if ($('#rb_retencao_sim').is(':checked')  == true || $('#_rb_retencao_sim').is(':checked')  == true &&
				$('#_rb_aprovaFiscal_sim').is(':checked')  == true || $('#rb_aprovaFiscal_sim').is(':checked')  == true) {
				$('#retencoesImpostos').show();
			}
		}
	}

	$('#rb_aprovaFiscal_sim').click(function () {
		if ($('#rb_retencao_sim').is(':checked')) {
			$('#retencoesImpostos').show();
		}
	});
	$('#rb_retencao_sim').click(function () {
		if ($('#rb_aprovaFiscal_sim').is(':checked')) {
			$('#retencoesImpostos').show();
		}
	});
	$('#rb_aprovaFiscal_nao').click(function () {
		$('#retencoesImpostos').hide();
	});
	$('#rb_retencao_nao').click(function () {
		$('#retencoesImpostos').hide();
	});
	$('#btZoomEmpresa').click(function () {
		var solicitante = $('#idSolic').val();
		openZoom("Empresas", "ctgEmpresaFilial", "cnpj,Codigo,codigo,Descricao,filial,Codigo,empresa,Descricao,descfilial,Descricao",
			[solicitante] + ",cnpj,codigo,filial,empresa,descfilial", "empresa");
	});
	$('#btZoomFornecedor').click(function () {
		if ($('#cEmpresa').val() == '' || $('#cFilial').val() == '') {
			$('#ErroForn').show();
		} else {
			$('#ErroForn').hide();
			var empresa = $('#codEmpresa').val();
			var filial = $('#codFilial').val();
			var solicitante = $('#idSolic').val();
			openZoom("Fornecedores", "ctgFornecedor", "Nome,Nome,cnpjcpf,CpfCnpj,Loja,Loja",
				[empresa, filial, solicitante] + ",Codigo,Loja,Nome,cnpjcpf", "Fornecedores");
		}
	});
	$('#btZoomPass').click(function () {

		openZoom("Beneficiarios", "ctgCollegueActive", "colleagueName,Nome,mail,E-mail",
			"colleagueName,mail,login", "beneficiario");
	});

	$("[name=rb_difal]").on("change", function () {
		if ($(this).val() == "sim") {
			$("[name=cDifal]").addClass("has-free");
		} else {
			$("[name=cDifal]").removeClass("has-free");

		}

		console.log($("[name=rb_difal]"));
	});
	$("[name=rb_sentido]").on("change", function () {
		//retira obritoriedade dos campos
		$('.has-free').removeClass("has-free");

		var cObgtNorm = ["NmSolic", "cEmpresa", "cFilial", "cCodForn", "VencData", "EmissData",
			"ValTitulo", "obsRecebimento", "cOcCod", "rb_tipoPgmto", 'nfCod'];
		var cObgtRev = ["codResponsavel", "obsReverso", "cCodForn", "cFilial", "VencData", "EmissData", 'ValTitulo', 'nfCod'];
		if ($(this).val() == "reverso") {
			// $("#solicitante").hide();
			$(".sol").hide();
			$("#formReverso").show();
			$('#btZoomPass').show();
			for (var i = 0; i < cObgtRev.length; i++) {
				$("[name='" + cObgtRev[i] + "']").addClass("has-free");
			}
		} else if ($(this).val() == "normal") {
			for (var i = 0; i < cObgtRev.length; i++) {
				$("[name='" + cObgtRev[i] + "']").val("");
			}
			//torna campos obrigatorios
			for (var i = 0; i < cObgtNorm.length; i++) {
				$("[name='" + cObgtNorm[i] + "']").addClass("has-free");
			}
			$("#solicitante").show();
			$(".sol").show();
			$("#formReverso").hide();
		}
		// 	$("[name=cDifal]").addClass("has-free");
		// }else{
		// 	$("[name=cDifal]").removeClass("has-free");

		// }

		// console.log($("[name=rb_difal]"));
	});

	//atividade preencher dados
	$("[name=rb_acptSol]").on("change", function () {
		//retira obritoriedade dos campos
		$('.has-free').removeClass("has-free");

		var cObgtNorm = ["NmSolic", "cEmpresa", "cFilial", "cCodForn", "VencData", "EmissData",
			"ValTitulo", "obsRecebimento", "cOcCod", "rb_tipoPgmto"];
		var cObgtRev = ["obsAcptSol"];
		if ($(this).val() == "nao") {
			$("#solicitante").hide();
			$("#obsAcptDiv").show();
			//$("#obsAcptSol").addClass("has-free");
			$("[name=obsAcptSol]").addClass("has-free");
		} else if ($(this).val() == "sim") {
			//torna campos obrigatorios
			for (var i = 0; i < cObgtNorm.length; i++) {
				$("[name='" + cObgtNorm[i] + "']").addClass("has-free");
			}
			$("#solicitante").show();
			$("#obsAcptDiv").hide();
			$("#obsAcptSol").val("");

		}
	});



	if (atividade == inicio && isReverso())
		handleReverseReturn();


	$('[name=rb_acptSol]:checked').change();

	
	 $("input:radio[name=rb_tipoPgmto]:checked").on("change", function () {
		
		if($('#rb_tipoPgmto_serv').is(':checked')) {
			console.log("Serviço");
		}
		

		if($('#rb_tipoPgmto_prod').is(':checked')) {
			console.log("Produto");
		}
		
	});


	$("#valLiquidoNF").val($("#ValTitulo").val());
	$("#valLiquidoNF").val($("#ValTitulo").val());

});

function isReverso() {
	return $("[name=rb_sentido]:checked").val() == 'reverso';
}
function setDivReadOnly(ids) {
	$.each(ids, function (key, value) {
		$("#" + value).find("input[type='text'],input[type='date']").attr("readonly", "readonly");
		$("#" + value).find("input[type='text'],input[type='date']").addClass("ReadOnly");
		$("#" + value).find("input[type='button']").hide();
		$("#" + value).find("img").hide();
		$("#" + value).find('.esconde').hide();
		$("#" + value).find('.desabilita').attr('disabled', true);
		$("#" + value).find('#adicionarLinha').hide();
		$("#" + value).find("select").each(function () {
			var val = $(this).find("option[selected]").text();
			$(this).parent().append($("<input class='ReadOnly' readonly='readonly' value='" + val + "'/>"));
			$(this).hide();
		});
	});
}
function openZoom(title, dataset, fields, resultFields, type, filters) {
	openZoomWindowParam(title, dataset, fields, resultFields, type, filters);
}
/**
 * @Overload de openZoom
 * Abre janela de zoom.
 * + @param windowParams: Parâmetros da janela de zoom.
 */
function openZoomWindowParam(title, dataset, fields, resultFields, type, filters) {
	var windowParams = "status , scrollbars=no ,width=800, height=350 , top=0 , left=0";
	var zoomURL = "/webdesk/zoom.jsp?datasetId=" + dataset + "&dataFields=" + escape(fields) + "&resultFields=" + resultFields + "&type=" + type + "&title=" + title + (filters ? "&filterValues=" + filters : "");
	window.open(zoomURL, "zoom", windowParams);
}
function mascara(o, f) {
	v_obj = o;
	v_fun = f;
	setTimeout("execmascara()", 1);
}
function setSelectedZoomItem(selectedItem) {

	if (selectedItem.type == 'empresa') {
		$('#codEmpresa').val(selectedItem.codigo);
		$('#codFilial').val(selectedItem.filial).change();
		$("#cEmpresa").val(selectedItem.empresa);
		$("#cFilial").val(selectedItem.filial + ' - ' + selectedItem.descfilial);
	}
	if (selectedItem.type == "Fornecedores") {
		$("#cCodForn").val(selectedItem.Codigo);
		$("#CodForn").val(selectedItem.Nome);
		$("#clojaForn").val(selectedItem.Loja);
		$("#detailFornecedor").val("CNPJ/CPF: " + selectedItem.cnpjcpf + " - Loja: " + selectedItem.Loja);
	}
	if (selectedItem.type == 'beneficiario') {
		$('#codResponsavel').val(selectedItem.login);
		$('#cResponsavel').val(firstCapitol(selectedItem.colleagueName));
	}
}
function validaData(campo) {
	var date = campo.value;
	var ardt = new Array;
	var ExpReg = new RegExp("(0[1-9]|[12][0-9]|3[01])/(0[1-9]|1[012])/[12][0-9]{3}");
	ardt = date.split("/");
	erro = false;
	if (date == "__/__/____" || date == '') {
		erro = false;
	}
	else if (date.search(ExpReg) == -1) {
		erro = true;
	}
	else if (((ardt[1] == 4) || (ardt[1] == 6) || (ardt[1] == 9) || (ardt[1] == 11)) && (ardt[0] > 30))
		erro = true;
	else if (ardt[1] == 2) {
		if ((ardt[0] > 28) && ((ardt[2] % 4) != 0))
			erro = true;
		if ((ardt[0] > 29) && ((ardt[2] % 4) == 0))
			erro = true;
	}
	if (erro) {
		if (!(date == "__/__/____" || date == '')) {
			alert("" + campo.value + " i18n.translate('erroData')!!!");
			campo.value = "";
			campo.focus();
			return false;
		}
	}
	return true;
}
function validaDiaHoje(elm) {
	if (
		elm.id == 'TrvlPayDt' ||
		elm.id == 'TrvlStart') {
		var data = elm.value.split('/');
		data = new Date(data[2], data[1] - 1, data[0]);
		$('#Erro' + elm.id).hide();
		if (data < new Date()) {
			$('#Erro' + elm.id).show();
			elm.value = '';
			elm.focus();
		}
	} if (elm.id == 'VencData') {
		var data = elm.value.split('/');
		data = new Date(data[2], data[1] - 1, data[0]);
		$('#Erro' + elm.id).hide();
		if (data < new Date()) {
			$('#Erro' + elm.id).show();
			elm.value = '';
			elm.focus();
		}
	} if (elm.id == 'TrvlEnd') {
		var data = elm.value.split('/');
		data = new Date(data[2], data[1] - 1, data[0]);
		var dtInicio = $('#TrvlStart').val().split('/');
		dtInicio = new Date(dtInicio[2], dtInicio[1] - 1, dtInicio[0]);
		$('#Erro' + elm.id).hide();
		if (data < new Date()) {
			$('#Erro' + elm.id).show();
			elm.value = '';
			elm.focus();
		} else if (data < new Date()) {

		}
	} if (elm.id == 'EmissData') {
		var data = elm.value.split('/');
		data = new Date(data[2], data[1] - 1, data[0]);
		$('#Erro' + elm.id).hide();
		if (data < new Date()) {
			$('#Erro' + elm.id).show();
			elm.value = '';
			elm.focus();
		}
	}
}

function execmascara() {
	v_obj.value = v_fun(v_obj.value);
}


function soNumeros(v) {
	return v.replace(/\D/g, "");
}

function onlyNumber(elem) {
	$(elem).val(soNumeros($(elem).val()));
}


function mvalor2(v) {
	v = v.replace(/\D/g, "");//Remove tudo o que não é dígito
	v = v.replace(/(\d)(\d{2})$/, "$1.$2");//coloca a virgula antes dos 2 últimos dígitos
	return v;
}
function mvalor(v) {
	v = v.replace(/\D/g, "");//Remove tudo o que não é dígito
	v = v.replace(/(\d)(\d{8})$/, "$1,$2");//coloca o ponto dos milhões
	v = v.replace(/(\d)(\d{5})$/, "$1,$2");//coloca o ponto dos milhares

	v = v.replace(/(\d)(\d{2})$/, "$1.$2");//coloca a virgula antes dos 2 últimos dígitos
	return ('R$ ' + v);
}
function firstCapitol(str) {
	str = str.toLowerCase().replace(/\b[a-z]/g, function (letter) {
		return letter.toUpperCase();
	});
	return str;
}

let handleReverseReturn = function () {

	//mostra div reverso
	$("[name=rb_sentido]:checked").change();

	//mostra div de retorno
	$('#acptSol').show();
	$('#obsAcptDiv').show();

}

function data(valor, tipo) {
	var novovalor = valor == null ? Date() : valor;
	var data = new Date(novovalor);
	var mes = data.getUTCMonth() < 10 ? "0" + (data.getUTCMonth() + 1) : (data.getUTCMonth() + 1);
	var ano = data.getUTCFullYear();
	var dia = data.getUTCDate() < 10 ? "0" + data.getUTCDate() : data.getUTCDate();

	if (tipo == "COMPETENCIAPGTO") {
		var novaData = String(ano) + "/" + String(mes);
	} else {
		var novaData = String(ano) + "/" + String(mes) + "/" + String(dia);
	}
	return novaData;
}