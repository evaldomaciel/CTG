function enableFields(form) {

	var activity = parseInt(getValue('WKNumState')); /*armazena o numero da solicitacao*/
	log.info('LOG: ' + getValue("WKNumProces"));
	log.info('LOG: ' + getValue("WKCompany"));
	log.info('LOG: ' + getValue("WKCardId"));
	form.setValue('WKinformacoes', getValue("WKNumProces") + ";" + getValue("WKCompany") + ";" + getValue("WKCardId"));
	if (activity == 0) { activity = 4; }
	form.setValue('WKMode', form.getFormMode());
	form.setValue('campo_processo', activity);
	if (activity == verificarNeg) { activity = inicio; }
	if (activity == ajustarInfos) { activity = inicio; }
	handlePreencheDados(activity, form);
	if (activity == preencheDados) { activity = inicio; }

	form.setEnhancedSecurityHiddenInputs(true);
	form.setHidePrintLink(true);

	form.setEnabled("NmSolic", (activity == inicio));
	form.setEnabled("cEmpresa", (activity == inicio));
	form.setEnabled("cFilial", (activity == inicio));
	form.setEnabled("cCodForn", (activity == inicio));
	form.setEnabled("VencData", (activity == inicio));
	form.setEnabled("EmissData", (activity == inicio));
	form.setEnabled("ValTitulo", (activity == inicio));
	form.setEnabled("obsRecebimento", (activity == inicio));
	form.setEnabled("cOcCod", (activity == inicio));
	form.setEnabled("rb_tipoPgmto", (activity == inicio));
	form.setEnabled("nfCod", (activity == inicio));
	form.setEnabled('rb_sentido', (activity == inicio));



	form.setEnabled("rb_retencao", (activity == informarRetencao));
	form.setEnabled("cIrrf", (activity == informarRetencao));
	form.setEnabled("cPIS", (activity == informarRetencao));
	form.setEnabled("cCOFINS", (activity == informarRetencao));
	form.setEnabled("cCSLL", (activity == informarRetencao));
	form.setEnabled("cINSS", (activity == informarRetencao));
	form.setEnabled("cISS", (activity == informarRetencao));
	form.setEnabled("cBaseCalInss", (activity == informarRetencao));
	form.setEnabled("rb_aprovaFiscal", (activity == informarRetencao));
	form.setEnabled("ObsFiscalRet", (activity == informarRetencao));


	form.setEnabled("rb_aprovaDifal", (activity == difal));
	form.setEnabled("rb_difal", (activity == difal));
	form.setEnabled("cDifal", (activity == difal));
	form.setEnabled("ObsDifalRet", (activity == difal));

	form.setEnabled("RecebData", (activity == receberDoc));
	form.setEnabled("rb_aprovaFinanceiro", (activity == receberDoc));
	form.setEnabled("ObsFinanceiro", (activity == receberDoc));
	form.setEnabled("retornoFinOpt", (activity == receberDoc));


}

function handlePreencheDados(activity, form) {

	form.setEnabled("rb_acptSol", (activity == preencheDados));
	form.setEnabled("obsAcptSol", (activity == preencheDados));
}