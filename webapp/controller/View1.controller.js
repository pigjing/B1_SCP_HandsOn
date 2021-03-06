sap.ui.define(["sap/ui/core/mvc/Controller"], function(Controller) {
	"use strict";
	return Controller.extend("sa.B1SL_SUMMIT_2018.controller.View1", {
		/**
		 *@memberOf sa.B1SL_SUMMIT_2018.controller.View1
		 */
		onSearch: function(oEvent) {
			//This code was generated by the layout editor.
			// create model filter
			var filters = [];
			var query = oEvent.getParameter("query");
			if (query && query.length > 0) {
				var filter = new sap.ui.model.Filter("DocEntry", sap.ui.model.FilterOperator.GE, query);
				filters.push(filter);
			}
			// update list binding
			var list = this.getView().byId("__table0");
			var binding = list.getBinding("items");
			binding.filter(filters);
		},
		/**
		 *@memberOf sa.B1SL_SUMMIT_2018.controller.View1
		 */
		action: function(oEvent) {
			var that = this;
			var actionParameters = JSON.parse(oEvent.getSource().data("wiring").replace(/'/g, "\""));
			var eventType = oEvent.getId();
			var aTargets = actionParameters[eventType].targets || [];
			aTargets.forEach(function(oTarget) {
				var oControl = that.byId(oTarget.id);
				if (oControl) {
					var oParams = {};
					for (var prop in oTarget.parameters) {
						oParams[prop] = oEvent.getParameter(oTarget.parameters[prop]);
					}
					oControl[oTarget.action](oParams);
				}
			});
			var oNavigation = actionParameters[eventType].navigation;
			if (oNavigation) {
				var oParams = {};
				(oNavigation.keys || []).forEach(function(prop) {
					oParams[prop.name] = encodeURIComponent(JSON.stringify({
						value: oEvent.getSource().getBindingContext(oNavigation.model).getProperty(prop.name),
						type: prop.type
					}));
				});
				if (Object.getOwnPropertyNames(oParams).length !== 0) {
					this.getOwnerComponent().getRouter().navTo(oNavigation.routeName, oParams);
				} else {
					this.getOwnerComponent().getRouter().navTo(oNavigation.routeName);
				}
			}
		}
	});
});