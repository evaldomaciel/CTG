function afterTaskSave(colleagueId,nextSequenceId,userList){
	if(nextSequenceId == 5){
		var url = "http://ctgbr.fluig.com";
		var COD_solicitacao = getValue("WKNumProces");
		var user = getValue("WKUser");
		var empresa = getValue('WKCompany');
		var c1 = DatasetFactory.createConstraint("colleaguePK.colleagueId", user, user, ConstraintType.MUST);
		var colaboradorDS = DatasetFactory.getDataset("colleague", null, new Array(c1), null);
		var colaborador = colaboradorDS.getValue(0,"colleagueName");
		var nPedidoCompra = hAPI.getCardValue('cOcCod');
		
		try{
		    //Monta mapa com par�metros do template
		    var parametros = new java.util.HashMap();
		    var conteudo  = i18n.translate("conteudo");
		    var conteudo2 = i18n.translate("conteudo.2");
		    conteudo = conteudo +" "+ nPedidoCompra +" " + conteudo2;
		    parametros.put("RECEIVER", colaborador);
		    parametros.put("EVENT", conteudo);
		    parametros.put("SERVER_URL", url);
		    parametros.put("TENANT_ID", empresa); 
		    parametros.put("SENDERS_LINKS", '');
		    parametros.put("DESCRIPTION", '');
		    parametros.put("LINK",url);
		    var assunto = i18n.translate("assunto");
		    assunto = assunto + ' ' +COD_solicitacao;
		    //Este par�metro � obrigat�rio e representa o assunto do e-mail
		    parametros.put("subject", assunto);
		 
		    //Monta lista de destinat�rios
		    var destinatarios = new java.util.ArrayList();
		    destinatarios.add(user.toString());
		 
		    //Envia e-mail
		    notifier.notify("admin", "DEFAULT_EMAIL_NOTIFICATION", parametros, destinatarios, "text/html");
		 
		} catch(e){
		    log.info(e);
		}
	}
	
}