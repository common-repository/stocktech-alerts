
(function () {
	//alert("test");
	if (typeof tinymce.PluginManager.get('stocktech_charts_button') != 'undefined')
		return;
	var stocktech_editor_button;
	var stocktech_pluginSelector;
	tinymce.PluginManager.add('stocktech_charts_button', function (editor, url) {
		var single_chart_type = '';
		var js_active_editor = editor;
		var stocktech_save_settings;
		var chart_types = function () {
			var types = null;
			var typesValues = [];
			var i = 0;

			if (typeof stocktech_alerts != 'undefined') {
				single_chart_type = 'Stocktech Alerts';
				stocktech_save_settings = stocktech_alerts_settings;
				typesValues.push({ value: 'Stocktech Alerts', text: 'Stock Market Overview' });
				i++;
			}

			if (i > 1) {
				types = {
					type: 'combobox',
					name: 'chart_type',
					label: 'Widget Type',
					classes: 'f_chart_type',
					values: typesValues,

					onselect: function () {
						OnChangeStocktechType(this.value());
					}
				};
			}

			return types;
		};
		var m_types = chart_types();
		// 
		editor.addButton('stocktech_charts_button', {

			tooltip: 'Insert Stocktech shortcode',
			icon: 'icon-stocktech',
			onclick: function () {
				// Open window
				stocktech_editor_button = editor.windowManager.open({
					title: 'Stocktech Widgets',
					onpostrender: function (e) {
						setTimeout(function () {
							var windowJQ = jQuery(tinyMCE.activeEditor.windowManager.windows[0].getEl(0));
							var jqForm = windowJQ.find(".mce-reset");
							var h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
							if (h < windowJQ.height()) {
								windowJQ.css("height", h);
								windowJQ.css("width", windowJQ.width() + 20);
								windowJQ.attr("test123", "red");
								jqForm.css("height", "100%");
								jqForm.css("overflow-y", "auto");
								jqForm.css("overflow-x", "hidden");
							}
						}, 100);
					},
					body: [
						m_types,
						{
							type: 'combobox',
							name: 'exchange',
							label: 'Stock Exchange',
							classes: 'f_s f_exchange s_h_c s_q_b s_m_o s_m_n s_t',
							onPostRender: function (e) {
								setTimeout(function () {
									var windowJQ = jQuery(tinyMCE.activeEditor.windowManager.windows[0].getEl(0));
									var items = stocktech_editor_button.settings.body;
									var v = items[0] != null ? items[0].values[0].value : single_chart_type;
									windowJQ.find(".mce-f_chart_type input").val(v);
									OnChangeStocktechType(v);
								}, 50);
							},
							value: stocktech_save_settings.default_exchange,
							values: [
								{ value: 'AMSE', text: 'Amman Stock Exchange' }

							]
						},
						{ type: 'textbox', name: 'symbol', label: 'Symbol', classes: 'f_s f_symbol s_h_c s_m_n', value: stocktech_save_settings.default_symbol },
						{ type: 'textbox', name: 'compare', label: 'Compare', classes: 'f_s f_compare s_h_c', value: stocktech_save_settings.default_compare },
						{ type: 'textbox', name: 'symbols', label: 'Symbols', classes: 'f_s f_symbols s_q_b s_t', value: stocktech_save_settings.default_symbols },

						{ type: 'radio', name: 'scroll', label: 'Scroll', classes: 'f_s f_symbols s_t', value: stocktech_save_settings.default_scroll },

						{
							type: 'combobox',
							name: 'speed',
							label: 'Speed',
							classes: 'f_s f_speed s_t',
							value: stocktech_save_settings.default_displayPrices,
							values: [
								{ value: 'slowest', text: 'Slowest' },
								{ value: 'slower', text: 'Slower' },
								{ value: 'slow', text: 'Slow' },
								{ value: 'normal', text: 'Normal' },
								{ value: 'fast', text: 'Fast' },
								{ value: 'faster', text: 'Faster' }
							]
						},

						{ type: 'textbox', name: 'width', label: 'Width', classes: 'f_s f_width s_h_c s_q_b s_m_o s_m_n s_t', value: stocktech_save_settings.default_width },
						{ type: 'textbox', name: 'height', label: 'Height', classes: 'f_s f_height s_h_c s_q_b s_m_o s_m_n', value: stocktech_save_settings.default_height },
						{ type: 'textbox', name: 'title', label: 'Title', classes: 'f_s f_title s_q_b s_m_o s_m_n', value: stocktech_save_settings.default_title },
						{ type: 'checkbox', name: 'includeChart', label: 'Include Chart', classes: 'f_s f_includeChart s_q_b s_m_o', checked: stocktech_save_settings.default_includeChart == "1" ? true : false },

						{ type: 'checkbox', name: 'allowSort', label: 'Allow Sort', classes: 'f_s f_allowSort s_q_b s_m_o', checked: stocktech_save_settings.default_allowSort == "1" ? true : false },

						{ type: 'textbox', name: 'logoMaxHeight', label: 'Logo Maximum Height', classes: 'f_s f_logoMaxHeight s_q_b s_m_o', value: stocktech_save_settings.default_logoMaxHeight },
						{ type: 'textbox', name: 'logoMaxWidth', label: 'Logo Maximum Width', classes: 'f_s f_logoMaxWidth s_q_b s_m_o', value: stocktech_save_settings.default_logoMaxWidth },


						{
							type: 'combobox',
							name: 'displayPrices',
							label: 'Display Prices',
							classes: 'f_s f_displayPrices s_h_c',
							value: stocktech_save_settings.default_displayPrices,
							values: [
								{ value: 'OHLC', text: 'OHLC' },
								{ value: 'HLC', text: 'HLC' },
								{ value: 'Candlestick', text: 'Candlestick' },
								{ value: 'Lines', text: 'Lines' },
								{ value: 'Area', text: 'Area' }
							]
						},



						{ type: 'checkbox', name: 'allowPeriodChange', label: 'Allow Period Change', classes: 'f_s f_allowPeriodChange s_h_c', checked: stocktech_save_settings.default_allowPeriodChange == "1" ? true : false },

						{
							type: 'combobox',
							name: 'culture',
							label: 'Culture',
							classes: 'f_s f_culture s_h_c s_q_b s_m_o s_m_n',
							value: stocktech_save_settings.default_culture,
							values: [
								{ value: 'Default', text: 'Default', classes: "stocktech_class_c s_h_c s_q_b s_m_o" }
							],
							onclick: function () {
								jQuery(".mce-stocktech_class_c").hide();
								jQuery(".mce-stocktech_class_c" + stocktech_pluginSelector).show();
							},
							onpostrender: function () {

							}
						},

						{ type: 'textbox', name: 'maxItems', label: 'Max Items', classes: 'f_s f_maxItems s_m_n', value: stocktech_save_settings.default_maxItems }

					],
					onsubmit: function (e) {
						// Insert content when the window form is 
						var params = "";
						params += AddShortcodeParam(e.data.exchange, "stockExchange");
						params += AddShortcodeParam(e.data.width, "width");
						if (e.data.chart_type == "Historical Chart" || single_chart_type == "Historical Chart") {
							params += AddShortcodeParam(e.data.symbol, "symbol");
							params += AddShortcodeParam(e.data.compare, "compare");
							params += AddShortcodeParam(e.data.displayPrices, "displayPrices");
							params += AddShortcodeParam(e.data.performance, "performance");
							params += AddShortcodeParam(e.data.from, "from");
							params += AddShortcodeParam(e.data.to, "to");
							params += AddShortcodeParam(e.data.days, "days");
							params += AddShortcodeParam(e.data.allowPeriodChange ? "true" : "false", "allowPeriodChange");
							params += AddShortcodeParam(e.data.height, "height");
							params += AddShortcodeParam(e.data.culture, "culture");

						}
						else {
							if (e.data.chart_type == "Quotes List" || single_chart_type == "Quotes List") {
								params += AddShortcodeParam(e.data.symbols, "symbols");
								params += AddShortcodeParam(e.data.title, "title");
								params += AddShortcodeParam(e.data.allowSort, "allowSort");
								params += AddShortcodeParam(e.data.includeChart, "includeChart");
								params += AddShortcodeParam(e.data.logoMaxHeight, "logoMaxHeight");
								params += AddShortcodeParam(e.data.logoMaxWidth, "logoMaxWidth");
								params += AddShortcodeParam(e.data.height, "height");
								params += AddShortcodeParam(e.data.culture, "culture");
							}
							else {
								if (e.data.chart_type == "Stock Market Overview" || single_chart_type == "Stock Market Overview") {
									params += AddShortcodeParam(e.data.title, "title");
									params += AddShortcodeParam(e.data.includeChart, "includeChart");
									params += AddShortcodeParam(e.data.height, "height");
									params += AddShortcodeParam(e.data.culture, "culture");
								}
								else {
									if (e.data.chart_type == "Stock Market News" || single_chart_type == "Stock Market News") {
										params += AddShortcodeParam(e.data.symbol, "symbol");
										params += AddShortcodeParam(e.data.title, "title");
										params += AddShortcodeParam(e.data.maxItems, "maxItems");
										params += AddShortcodeParam(e.data.height, "height");
										params += AddShortcodeParam(e.data.culture, "culture");
										params += AddShortcodeParam(e.data.includeRelated, "includeRelated");
									}
									else {
										if (e.data.chart_type == "Stock Market Ticker" || single_chart_type == "Stock Market Ticker") {
											params += AddShortcodeParam(e.data.symbols, "symbols");
											params += AddShortcodeParam(e.data.scroll, "scroll");
											params += AddShortcodeParam(e.data.speed, "speed");
										}
									}
								}
							}
						}
						var pluginShortCodeName;
						if (typeof e.data.chart_type != 'undefined')
							pluginShortCodeName = GetPluginShortCodeName(e.data.chart_type);
						else
							pluginShortCodeName = GetPluginShortCodeName(single_chart_type);
						editor.insertContent('[' + pluginShortCodeName + ' ' + params + ']');
					}


				});



			}

		});

		function AddShortcodeParam(p, paramName) {
			if (typeof p != 'undefined' && p.length !== 0) {
				return ' ' + paramName + '="' + p + '"';
			}
			return '';
		}
		function GetPluginShortCodeName(chartType) {
			switch (chartType) {
				case "Stocktech Symbols":
					return "stocktech-symbols";
				case "Stocktech Alerts":
					return "stocktech-alerts";
				case "Stocktech Ticker":
					return "stocktech-ticker";
				default:
					return "";
			}
		}

		function OnChangeStocktechType(type) {
			var windowJQ = jQuery(tinyMCE.activeEditor.windowManager.windows[0].getEl(0));

			switch (type) {
				case "Stocktech Alerts":
					stocktech_save_settings = stocktech_alerts_settings;
					stocktech_pluginSelector = ".mce-s_m_o";
					break;
			}

			windowJQ.find(".mce-f_s").each(function () {
				jQuery(this).parent().parent().hide();
			});
			windowJQ.find(stocktech_pluginSelector).each(function () {
				jQuery(this).parent().parent().show();
			});
			var jqForm = windowJQ.find(".mce-form");
			var initTop = 20;
			jqForm.find(".mce-formitem:visible").each(function () {
				jQuery(this).css("top", initTop);
				initTop += 40;
			});
			jqForm.closest(".mce-container-body").css("height", initTop + 10);
			jqForm.closest(".mce-panel").css("height", initTop + 60);

			if (type == "Quotes List") {
				var arrayIni = ["includeLogo", "includeSymbol", "includeCompany", "includePrice", "includeChange", "includePercentChange", "includeTrend", "showHeader"];
				var i;
				for (i = 0; i < arrayIni.length; i++) {
					var jqField = windowJQ.find(".mce-f_" + arrayIni[i]);
					if (jqField.attr("aria-checked") != "true")
						jqField.click();
				}
			}

			var i;
			var items = stocktech_editor_button.settings.body;
			var item;
			for (i = 0; i < items.length; i++) {
				item = items[i];
				if (item == null || item.name == "chart_type")
					continue;
				var jqField = windowJQ.find(".mce-f_" + item.name);
				if (typeof stocktech_save_settings["default_" + item.name] != 'undefined') {
					if (jqField.hasClass("mce-checkbox")) {
						if (stocktech_save_settings["default_" + item.name] == "1" && jqField.attr("aria-checked") != "true")
							jqField.click();
						if (stocktech_save_settings["default_" + item.name] != "1" && jqField.attr("aria-checked") == "true")
							jqField.click();
					}
					else {
						if (jqField.hasClass("mce-combobox")) {
							windowJQ.find(".mce-f_" + item.name).find("input").val(stocktech_save_settings["default_" + item.name]);
						}
						else {
							windowJQ.find(".mce-f_" + item.name).val(stocktech_save_settings["default_" + item.name]);
						}
					}
				}
				else {
					if (jqField.hasClass("mce-checkbox")) {
						if (jqField.attr("aria-checked") == "true")
							jqField.click();
					}
					else {
						if (jqField.hasClass("mce-combobox")) {
							windowJQ.find(".mce-f_" + item.name).find("input").val("");
						}
						else
							windowJQ.find(".mce-f_" + item.name).val("");
					}

				}
			}

		}
	});

})();
