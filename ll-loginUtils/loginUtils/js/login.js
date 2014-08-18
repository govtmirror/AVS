Ext.ns("LLVA.Login");LLVA.Login.LoginWindow=Ext.extend(Ext.Window,(function(){var c;var d;var a="U.S. Government Computer System\r\n\r\nU. S. government systems are intended to be used by authorized government network users for viewing and retrieving information only, except as otherwise explicitly authorized for official business and limited personal use in accordance with policy. Information from these systems resides on and transmits through computer systems and networks funded by the government. All access or use constitutes understanding and acceptance that there is no reasonable expectation of privacy in the use of Government networks or systems.\r\n\r\nThe data and documents on this system include Federal records that contain sensitive information protected by various Federal statutes, including the Privacy Act, 5 U.S.C. Section 552a, and veterans' records confidentiality statutes such as 38 U.S.C. Sections 5701 and 7332. Access to the data and records is on a need-to-know basis only.\r\n\r\nAll access or use of this system constitutes user understanding and acceptance of these terms and constitutes unconditional consent to review and action including (but not limited to) monitoring, recording, copying, auditing, inspecting, investigating, restricting access, blocking, tracking, disclosing to authorized personnel, or any other authorized actions by all authorized government and law enforcement personnel.\r\n\r\nUnauthorized user attempts or acts to (1) access, upload, change, or delete information on this system, (2) modify this system, (3) deny access to this system, (4) accrue resources for unauthorized use or (5) otherwise misuse this system are strictly prohibited. Such attempts or acts are subject to action that may result in criminal, civil, or administrative penalties.";function b(){d.getForm().submit({method:"POST",waitTitle:"Just a second...",waitMsg:"Sending data...",success:function(){c.close();if(typeof c.loginCallback=="function"){c.loginCallback()}},failure:function(e,f){switch(f.failureType){case Ext.form.Action.CLIENT_INVALID:Ext.Msg.alert("Login Failed!","Form fields may not be submitted with invalid values");break;case Ext.form.Action.CONNECT_FAILURE:Ext.Msg.alert("Login Failed!","Ajax communication failed");break;case Ext.form.Action.SERVER_INVALID:Ext.Msg.alert("Login Failed!",f.result.errors);break}d.getForm().reset()}})}return{title:undefined,loginUrl:undefined,logoutUrl:undefined,stationsUrl:undefined,loginCallback:undefined,logoutCallback:undefined,initComponent:function(){c=this;Ext.apply(this,{layout:"fit",width:550,height:470,title:undefined,plain:true,hidden:true,closable:false,resizable:false,border:false,modal:true,draggable:true,items:[d=new Ext.form.FormPanel({labelWidth:80,frame:true,title:c.title,url:this.loginUrl,monitorValid:true,items:[new Ext.form.TextArea({id:"vaMessage",width:522,height:275,hideLabel:true,readOnly:true,style:{marginBottom:"12px"},value:a}),new Ext.form.Hidden({id:"station",name:"station",value:Ext.util.Cookies.get("gov.lom.med.defaultFacilityNo")}),new Ext.form.ComboBox({id:"facilityNo",fieldLabel:"Institution",name:"institution",width:435,store:new LLVA.Login.StationsStore({dataUrl:c.stationsUrl}),displayField:"divisionName",valueField:"stationNumber",value:Ext.util.Cookies.get("gov.lom.med.defaultFacilityStr"),typeAhead:false,forceSelection:true,triggerAction:"all",emptyText:"",selectOnFocus:true,allowBlank:false,blankText:"Please select your VA institution.",listeners:{select:function(){Ext.getCmp("station").setValue(Ext.getCmp("facilityNo").value)}}}),new Ext.form.TextField({id:"access",name:"access",fieldLabel:"Access Code",inputType:"password",allowBlank:false,blankText:"Please enter your Vista Access Code.",value:""}),new Ext.form.TextField({id:"verify",name:"verify",fieldLabel:"Verify Code",inputType:"password",allowBlank:false,blankText:"Please enter your Vista Verify Code.",value:"",listeners:{specialkey:function(g,h){if(h.getKey()==h.ENTER){b()}}}})],buttons:[new Ext.Button({text:"Login",formBind:true,width:150,handler:function(){Ext.util.Cookies.set("gov.lom.med.defaultFacilityNo",Ext.getCmp("facilityNo").value,nextYear());Ext.util.Cookies.set("gov.lom.med.defaultFacilityStr",Ext.getCmp("facilityNo").getRawValue(),nextYear());b()}})]})]});LLVA.Login.LoginWindow.superclass.initComponent.apply(this,arguments)},listeners:{show:function(){if(Ext.getCmp("facilityNo").getValue()===""){Ext.getCmp("facilityNo").focus(false,100)}else{Ext.getCmp("access").focus(false,false)}}},login:function(f){if(f==null){this.show()}else{var e=new Ext.data.Connection({url:c.loginUrl,extraParams:f});e.request({success:function(){if(typeof c.loginCallback=="function"){c.loginCallback()}},failure:function(){c.show()}})}},logout:function(){var e=new Ext.data.Connection({url:c.logoutUrl});e.request({success:function(){LLVA.Login.LoginWindow._instance=null;if(typeof c.logoutCallback=="function"){c.logoutCallback()}},failure:function(){if(typeof c.logoutCallback=="function"){c.logoutCallback()}}})}}}()));LLVA.Login.LoginWindow._instance=null;LLVA.Login.LoginWindow.getInstance=function(a){if(this._instance===null){this._instance=new LLVA.Login.LoginWindow(a)}return this._instance};LLVA.Login.User=Ext.extend(Ext.util.Observable,(function(){var b;var a;return{userStoreUrl:undefined,userLoadedCallback:undefined,userDuz:"",userName01:"",userNameDisplay:"",userparentAdministrativeFacilityStationNumber:"",userParentComputerSystemStationNumber:"",userLastName:"",userFirstName:"",userMiddleName:"",userPrefix:"",userSuffix:"",userDegree:"",signonLogIen:"",userLoginStationNumber:"",divisionName:"",userRoles:undefined,constructor:function(c){b=this;Ext.apply(this,c);a=new Ext.data.JsonStore({proxy:new Ext.data.HttpProxy({url:this.userStoreUrl,method:"POST"}),root:"root",storeId:"userStore",fields:[{name:"userDuz"},{name:"userName01"},{name:"userNameDisplay"},{name:"userparentAdministrativeFacilityStationNumber"},{name:"userParentComputerSystemStationNumber"},{name:"userLastName"},{name:"userFirstName"},{name:"userMiddleName"},{name:"userPrefix"},{name:"userSuffix"},{name:"userDegree"},{name:"signonLogIen"},{name:"userLoginStationNumber"},{name:"divisionName"},{name:"userRoles"}],listeners:{load:function(f,e,h){var g=this.getAt(0);b.userDuz=g.get("userDuz");b.userName01=g.get("userName01");b.userNameDisplay=g.get("userNameDisplay");b.userparentAdministrativeFacilityStationNumber=g.get("userparentAdministrativeFacilityStationNumber");b.userParentComputerSystemStationNumber=g.get("userParentComputerSystemStationNumber");b.userLastName=g.get("userLastName");b.userFirstName=g.get("userFirstName");b.userMiddleName=g.get("userMiddleName");b.userPrefix=g.get("userPrefix");b.userSuffix=g.get("userSuffix");b.userDegree=g.get("userDegree");b.signonLogIen=g.get("signonLogIen");b.userLoginStationNumber=g.get("userLoginStationNumber");b.divisionName=g.get("divisionName");var d=g.get("userRoles");var j=d.split("^");b.userRoles=[];for(i=0;i<j.length;i++){b.userRoles[j[i]]=j[i]}if(typeof b.userLoadedCallback=="function"){b.userLoadedCallback(b)}}}})},loadUser:function(){a.load()},isUserInRole:function(c){if(this.userRoles===null){return false}return(this.userRoles[c]!==null)?true:false}}}()));LLVA.Login.User._instance=null;LLVA.Login.User.getInstance=function(a){if(this._instance===null){this._instance=new LLVA.Login.User(a)}return this._instance};LLVA.Login.StationsStore=Ext.extend(Ext.data.Store,(function(){return{dataUrl:undefined,constructor:function(a){Ext.apply(this,a);Ext.apply(this,{autoLoad:true,proxy:new Ext.data.HttpProxy({api:{read:this.dataUrl},method:"POST"}),reader:new Ext.data.JsonReader({idProperty:"stationNumber",root:"root",fields:[{name:"divisionName"},{name:"stationNumber"}]})});LLVA.Login.StationsStore.superclass.constructor.apply(this,arguments)}}}()));