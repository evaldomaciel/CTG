function beforeTaskSave(colleagueId, nextSequenceId, userList) {
	var COD_solicitacao = getValue("WKNumProces");
	var aprovaFiscal = hAPI.getCardValue('rb_aprovaFiscal');
	var msgComent = hAPI.getCardValue('ObsFinanceiro');
	var msgFiscal = hAPI.getCardValue('ObsFiscalRet');
	
	if(aprovaFiscal=='nao'){
		msgComent = msgFiscal;
	}
	
	
	if(nextSequenceId==19){
		hAPI.setTaskComments(colleagueId, COD_solicitacao, 0,"Favor Verificar: "+ msgComent);
	}
	if(nextSequenceId==50){
		msgComent = hAPI.getCardValue('obsAcptSol');
		hAPI.setTaskComments(colleagueId, COD_solicitacao, 0,"Favor Verificar: "+ msgComent);
	}
	if(nextSequenceId==14){

		var resp = '';
		if(hAPI.getCardValue('rb_sentido')=='reverso'){
			resp= hAPI.getCardValue('codResponsavel')
			//atualiza responsavel
			var idUser = hAPI.getCardValue('codResponsavel');
			var nameUser = hAPI.getCardValue('cResponsavel');
			hAPI.setCardValue('idSolic',idUser);
			hAPI.setCardValue('NmSolic',nameUser);
		}
		else 
			resp = hAPI.getCardValue('idSolic');	

		hAPI.setCardValue('responsavelNegativa',resp);
		var attachments = hAPI.listAttachments();
	    var hasAttachment = false;
	    if(attachments.size()>0){
	    	hasAttachment = true;
	    }	
	    if (!hasAttachment) {
	        throw i18n.translate("erroAnexos");
	    }
	}
	
}