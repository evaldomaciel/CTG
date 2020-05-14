/*Pedro Muriel Sousa
 *pedromuriel.sousa@gmail.com 
 * */
function displayFields(form, customHTML) {
	var activity = parseInt(getValue('WKNumState'));
	var idUser = getValue("WKUser");
	var operation = form.getValue('WKtipoOper');
	form.setValue('WKtipoOper', operation);
	form.setValue('WKMode', form.getFormMode());
	if (form.getValue('DtSolic') == '') {
		form.setValue('DtSolic', getDate());
	}
	if (form.getFormMode() != 'ADD' && form.getValue('NrSolic') == '') {
		form.setValue('NrSolic', getValue("WKNumProces"));
	}
	if (form.getValue('NmSolic') == '') {
		var c1 = DatasetFactory.createConstraint("colleaguePK.colleagueId", idUser, idUser, ConstraintType.MUST);
		var colaboradorDS = DatasetFactory.getDataset("colleague", null, new Array(c1), null);
		var colaborador = colaboradorDS.getValue(0, "colleagueName");
		form.setValue('NmSolic', colaborador);
		form.setValue('idSolic', idUser);
	}
	if (activity == 0) { activity = inicio; }
	if (activity == verificarNeg) { activity = inicio; }
	if (activity == ajustarInfos) { activity = inicio; }
	if (activity == preencheDados) { activity = inicio; }
	switch (activity) {
		case inicio:
			camposObrigatorios = ["NmSolic",
				"cEmpresa",
				"cFilial",
				"cCodForn",
				"VencData",
				"EmissData",
				"ValTitulo",
				"obsRecebimento",
				"cOcCod",
				"rb_tipoPgmto",
				"nfCod"];
			customHTML.append('<script>');
			for (var i = 0; i < camposObrigatorios.length; i++) {
				customHTML.append("$(\"[name='" + camposObrigatorios[i] + "']\").addClass(\"has-free\");");
			}
			customHTML.append('</script>');
			break;
		case informarRetencao:
			var idUser = getValue("WKUser");
			if (form.getFormMode() != 'VIEW' || form.getValue('idAnalistaTax') == '' || form.getValue('nomeTax') == '') {
				var c1 = DatasetFactory.createConstraint("colleaguePK.colleagueId", idUser, idUser, ConstraintType.MUST);
				var colaboradorDS = DatasetFactory.getDataset("colleague", null, new Array(c1), null);
				var colaborador = colaboradorDS.getValue(0, "colleagueName");
				form.setValue('nomeTax', colaborador);
				form.setValue('idAnalistaTax', idUser);
			}

			camposObrigatorios = ["rb_retencao",
				"rb_aprovaFiscal",
				"ObsFiscalRet"];
			/*,
								  "cIrrf",
								  "cPIS",
								  "cCOFINS",
								  "cCSLL",
								  "cINSS",
								  "cISS",
								  "cBaseCalInss"*/
			customHTML.append('<script>');
			for (var i = 0; i < camposObrigatorios.length; i++) {
				customHTML.append("$(\"[name='" + camposObrigatorios[i] + "']\").addClass(\"has-free\");");
			}
			customHTML.append('</script>');
			break;
		case difal:
			var idUser = getValue("WKUser");
			if (form.getFormMode() != 'VIEW' || form.getValue('idAnalistaDifal') == '' || form.getValue('nomeDifal') == '') {
				var c1 = DatasetFactory.createConstraint("colleaguePK.colleagueId", idUser, idUser, ConstraintType.MUST);
				var colaboradorDS = DatasetFactory.getDataset("colleague", null, new Array(c1), null);
				var colaborador = colaboradorDS.getValue(0, "colleagueName");
				form.setValue('nomeDifal', colaborador);
				form.setValue('idAnalistaDifal', idUser);
			}

			camposObrigatorios = ["rb_difal",
				"rb_aprovaDifal",
				"ObsDifalRet"];
			/*,
								  "cIrrf",
								  "cPIS",
								  "cCOFINS",
								  "cCSLL",
								  "cINSS",
								  "cISS",
								  "cBaseCalInss"*/
			customHTML.append('<script>');
			for (var i = 0; i < camposObrigatorios.length; i++) {
				customHTML.append("$(\"[name='" + camposObrigatorios[i] + "']\").addClass(\"has-free\");");
			}
			customHTML.append('</script>');
			break;
		case receberDoc:
			var idUser = getValue("WKUser");
			if (form.getFormMode() != 'VIEW' || form.getValue('idAnalistaFinanceiro') == '' || form.getValue('nomeFinanceiro') == '') {
				var c1 = DatasetFactory.createConstraint("colleaguePK.colleagueId", idUser, idUser, ConstraintType.MUST);
				var colaboradorDS = DatasetFactory.getDataset("colleague", null, new Array(c1), null);
				var colaborador = colaboradorDS.getValue(0, "colleagueName");
				form.setValue('nomeFinanceiro', colaborador);
				form.setValue('idAnalistaFinanceiro', idUser);
			}

			camposObrigatorios = ["RecebData",
				"rb_aprovaFinanceiro",
				"ObsFinanceiro"];
			customHTML.append('<script>');
			for (var i = 0; i < camposObrigatorios.length; i++) {
				customHTML.append("$(\"[name='" + camposObrigatorios[i] + "']\").addClass(\"has-free\");");
			}
			customHTML.append('</script>');
			break;
	}
}
function verLocalidade(cCodUsr) {
	var c1 = DatasetFactory.createConstraint("colleagueGroupPK.colleagueId", cCodUsr, cCodUsr, ConstraintType.MUST);
	var c2 = DatasetFactory.createConstraint("colleagueGroupPK.groupId", "Holding", "Holding", ConstraintType.MUST);
	var constraints = new Array(c1, c2);
	/*Define os campos para ordenacao*/
	var fields = new Array("colleagueGroupPK.colleagueId", "colleagueGroupPK.groupId",
		"colleagueGroupPK.companyId");
	var sortingFields = new Array("colleagueGroupPK.colleagueId");
	var colaboradorDS = DatasetFactory.getDataset("colleagueGroup", fields, constraints, sortingFields);
	var ret = false;
	if (colaboradorDS.rowsCount != 0) {
		for (var j = 0; j < colaboradorDS.rowsCount; j++) {
			if (colaboradorDS.getValue(j, "colleagueGroupPK.groupId") == 'Holding') {
				ret = true;
				break;
			}
		} return ret;
	} else {
		return ret;
	}
}
function getDate() {
	var fullDate = new Date();
	var date = fullDate.getDate().toString();
	if (date.length == 1) {
		date = 0 + date;
	}
	var month = (fullDate.getMonth() + 1).toString();
	if (month.length == 1) {
		month = 0 + month;
	}
	return date + "/" + month + "/" + fullDate.getFullYear();
}