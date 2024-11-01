!function (e) {
    function t(l) {
        if (n[l])
            return n[l].exports;
        var o = n[l] = {
            i: l,
            l: !1,
            exports: {}
        };
        return e[l].call(o.exports, o, o.exports, t),
            o.l = !0,
            o.exports
    }
    var n = {};
    t.m = e,
        t.c = n,
        t.d = function (e, n, l) {
            t.o(e, n) || Object.defineProperty(e, n, {
                configurable: !1,
                enumerable: !0,
                get: l
            })
        }
        ,
        t.n = function (e) {
            var n = e && e.__esModule ? function () {
                return e.default
            }
                : function () {
                    return e
                }
                ;
            return t.d(n, "a", n),
                n
        }
        ,
        t.o = function (e, t) {
            return Object.prototype.hasOwnProperty.call(e, t)
        }
        ,
        t.p = "",
        t(t.s = 0)
}([function (e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    n(1)
}
    , function (e, t, n) {
        "use strict";
        function l(e) {
            var t = e.palette
                , title = e.title
                , n = e.symbol
                , a = e.width
                , r = e.height
                , u = e.culture
                , w = e.style
                , _ = e.font
                , h = e.colors
                , v = [{
                    name: "symbol",
                    value: n
                }, {
                    name: "title",
                    value: ""
                }, {
                    name: "width",
                    value: "100%"
                }, {
                    name: "height",
                    value: "400"
                }, {
                    name: "culture",
                    value: u
                }, {
                    name: "style",
                    value: w
                }, {
                    name: "font",
                    value: _
                }]
                , g = 350
                , k = "100%";
            r && "%null%" != r && 0 != r && (g = r),
                a && "%null%" != a && 0 != a && (k = a.toLowerCase().replace("px", ""));
            var f = k + "px"
                , b = plugin._stocktechEditorUtil.getParams(v, stocktech_alerts_settings)
                , C = "?type=alerts";
            (o && "" != o && "%null%" != o || m && ("1" == m || "true" == m)) && (C = "?type=compare");
            for (var S = "https://stocktech.org/static/widget-symbols/" + C + "&" + b + "&showUserMenu=false&wpe=1", y = 0; y < h.length; y++)
                h[y].value && "%null%" !== h[y].value && (S += "&" + h[y].attrName + "=" + h[y].value.replace("#", ""));
            return wp.element.createElement("div", {
                class: "stocktech_frame_continer"
            }, wp.element.createElement("div", {
                class: "stocktech_frame_absolute"
            }), wp.element.createElement("iframe", {
                frameBorder: "0",
                scrolling: "no",
                width: k,
                height: g,
                src: S,
                style: {
                    width: f
                }
            }))
        }
        var o = n(2)
            , a = (n.n(o),
                n(3))
            , plugin = (n.n(a),
                n(4))
            , r = (n.n(plugin),
                n(5))
            , c = (n.n(r),
                wp.i18n.__)
            , registerBlockType = wp.blocks.registerBlockType
            , m = wp.editor.InspectorControls
            , u = wp.components
            , PanelBody = u.PanelBody
            , PanelRow = u.PanelRow
            , Fragment = wp.element.Fragment
            , w = [c("Stocktech Alerts")];
        registerBlockType("cgb/stocktech-alerts", {
            title: c("Stocktech Alerts"),
            icon: function () {
                return wp.element.createElement("svg", {
                    width: "24",
                    height: "24",
                    viewBox: "0 0 24 24",
                    xmlns: "http://www.w3.org/2000/svg",
                    role: "img",
                    "aria-hidden": "true",
                    focusable: "false"
                }, wp.element.createElement("g", {
                    id: "icon-historical-price",
                    "stroke-width": "1",
                    fill: "none",
                    "fill-rule": "evenodd",
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round"
                }, "\xa0\xa0\xa0\xa0"))
            }(),
            category: "stocktech-blocks",
            keywords: w,
            attributes: {
                symbol:             plugin._stocktechEditorControlsAttributes.getStringAttribute(),
                title:              plugin._stocktechEditorControlsAttributes.getStringAttribute(),
                width:              plugin._stocktechEditorControlsAttributes.getStringAttribute(),
                height:             plugin._stocktechEditorControlsAttributes.getStringAttribute(),
                language:           plugin._stocktechEditorControlsAttributes.getSelectAttribute(),
                font:               plugin._stocktechEditorControlsAttributes.getStringAttribute(),
                style:              plugin._stocktechEditorControlsAttributes.getSelectAttribute(),
                bordercolor:        plugin._stocktechEditorControlsAttributes.getColorAttribute(),
                backgroundColor:    plugin._stocktechEditorControlsAttributes.getColorAttribute(),
                captionColor:       plugin._stocktechEditorControlsAttributes.getColorAttribute(),
                titleColor:         plugin._stocktechEditorControlsAttributes.getColorAttribute(),
                priceColor:         plugin._stocktechEditorControlsAttributes.getColorAttribute(),
                labelsColor:        plugin._stocktechEditorControlsAttributes.getColorAttribute(),
                axesColor:          plugin._stocktechEditorControlsAttributes.getColorAttribute(),
                upColor:            plugin._stocktechEditorControlsAttributes.getColorAttribute(),
                downColor:          plugin._stocktechEditorControlsAttributes.getColorAttribute(),
                upTextColor:        plugin._stocktechEditorControlsAttributes.getColorAttribute(),
                downTextColor:      plugin._stocktechEditorControlsAttributes.getColorAttribute(),
                preview:            plugin._stocktechEditorControlsAttributes.getBoolenAttribute()
            },
            //*
            edit(props) {
                var attributes = props.attributes
                    , o                 = attributes.symbol
                    , title             = attributes.title
                    , width             = attributes.width
                    , height            = attributes.height
                    , language          = attributes.language
                    , C                 = attributes.style
                    , font              = attributes.font
                    , borderColor       = attributes.borderColor
                    , backgroundColor   = attributes.backgroundColor
                    , captionColor      = attributes.captionColor
                    , titleColor        = attributes.titleColor
                    , priceColor        = attributes.priceColor
                    , labelsColor       = attributes.labelsColor
                    , axesColor         = attributes.axesColor
                    , upColor           = attributes.upColor
                    , downColor         = attributes.downColor
                    , upTextColor       = attributes.upTextColor
                    , downTextColor     = attributes.downTextColor
                    , preview           = attributes.preview
                    , setAttributes     = props.setAttributes
                    , colors = (props.isSelected,
                        [
                            { value: borderColor,       name: "Border", attrName: "borderColor", info: "Border of Chart" },
                            { value: backgroundColor,   name: "Background", attrName: "backgroundColor", info: "Background of Chart" },
                            { value: captionColor,      name: "Caption", attrName: "captionColor", info: "Caption of Chart" },
                            { value: titleColor,        name: "Title", attrName: "titleColor", info: "titleColor of Chart" },
                            { value: priceColor,        name: "Price (Close)", attrName: "priceColor", info: "priceColor of Chart" },
                            { value: labelsColor,       name: "Labels", attrName: "labelsColor", info: "labelsColor of Chart" },
                            { value: axesColor,         name: "Axes Lines", attrName: "axesColor", info: "axesColor of Chart" },
                            { value: upColor,           name: "Positive", attrName: "upColor", info: "upColor of Chart" },
                            { value: upTextColor,       name: "Positive Text", attrName: "upTextColor", info: "upTextColor of Chart" },
                            { value: downColor,         name: "Negative", attrName: "downColor", info: "downColor of Chart" },
                            { value: downTextColor,     name: "Negative Text", attrName: "downTextColor", info: "downTextColor of Chart" }
                        ]);
                        var shouldDisplayControls = true;
                        /*return (0,wp.element.createElement)
                        (
                            wp.element.Fragment, null, shouldDisplayControls && 
                            (0,wp.element.createElement)/*
                            (wp.element.Fragment, null, 
                                (0,wp.element.createElement)(ColorEdit, props), 
                                (0,wp.element.createElement)(TypographyPanel, props), 
                                (0,wp.element.createElement)(BorderPanel, props), 
                                (0,wp.element.createElement)(DimensionsPanel, props)
                            ), 
                            (0,wp.element.createElement)(BlockEdit, props)//
                        );*/

                return preview ? wp.element.createElement(Fragment, null,
                    wp.element.createElement("img", {
                        src: "https://stocktech.org/img/TwoCharts_DemoImage.png"
                    })) :
                    wp.element.createElement(Fragment, null, 
                        wp.element.createElement(m, null,

                        wp.element.createElement(PanelBody, {
                            title: c("Data")
                        },
                            wp.element.createElement(PanelRow, { className: "s_b_pannel_row" }, plugin._stocktechEditorControls.symbols(o, setAttributes, stocktech_alerts_settings)),
                        ),
                        wp.element.createElement(PanelBody, { title: c("Style") },
                            wp.element.createElement(PanelRow, null, plugin._stocktechEditorControls.title(title, setAttributes, stocktech_alerts_settings)),
                            wp.element.createElement(PanelRow, null, plugin._stocktechEditorControls.width(width, setAttributes, stocktech_alerts_settings)),
                            wp.element.createElement(PanelRow, null, plugin._stocktechEditorControls.height(height, setAttributes, stocktech_alerts_settings)),
                            wp.element.createElement(PanelRow, null, plugin._stocktechEditorControls.language(language, setAttributes, stocktech_alerts_settings)),
                            wp.element.createElement(PanelRow, null, plugin._stocktechEditorControls.font(font, setAttributes, stocktech_alerts_settings)),
                            wp.element.createElement(PanelRow, null, plugin._stocktechEditorControls.style(C, setAttributes, stocktech_alerts_settings)),
                            wp.element.createElement(PanelRow, null, wp.element.createElement(r._ColorsModal, {
                                setAttributes: setAttributes,
                                colors: colors,
                                stocktech_default_settings: stocktech_alerts_settings
                            })))),
                        wp.element.createElement(l, {
                            symbol: o,
                            title: title,
                            width: width,
                            height: height,
                            language: language,
                            style: C,
                            font: font,
                            colors: colors
                        }))
            },//*/
            save(props) {
                // useBlockProps.save();
                return null
            },
            example: {
                attributes: {
                    preview: !0
                }
            }
        })
    }
    , function (e, t) { }
    , function (e, t) { }
    , function (e, t) {
        function n(e, t, n, l) {
            return l(e, t, !0)
        }
        function l(e) {
            var t = document.createElement("textarea");
            t.value = e,
                document.body.appendChild(t),
                t.select(),
                document.execCommand("copy"),
                document.body.removeChild(t)
        }
        function o(e, t, n) {
            var l = e.target.querySelector("option:checked")
                , o = {};
            o[t.toLowerCase()] = l.value,
                n(o),
                e.preventDefault()
        }
        function a(e, t, n) {
            var l = {};
            l[t.toLowerCase()] = e.target.value,
                n(l),
                e.preventDefault()
        }
        function i(e, t, n) {
            var l = {};
            l[t.toLowerCase()] = e,
                n(l)
        }
        function r(e, t, n) {
            var l = {};
            l[t.toLowerCase()] = e.target.checked ? "1" : "0",
                n(l)
        }
        function c(e, t, n) {
            var l = {};
            l[t.toLowerCase()] = e.target.checked ? "1" : "false",
                n(l)
        }
        wp.components.RadioControl,
            wp.element.useState;
        t._stocktechEditorUtil = {
            getParams(e, t, n) {
                var l = t.api_key
                    , o = "app-key=" + l
                    , a = void 0
                    , i = void 0
                    , r = void 0;
                return e.forEach(function (e) {
                    if (i = e.name,
                        r = t && t["default_" + i] ? t["default_" + i] : null,
                        "undefined" === typeof r && (r = null),
                        a = e.value && "%null%" != e.value ? e.value : r,
                        "transparentBackground" === i) {
                        if ("true" !== a && "1" !== a)
                            return;
                        i = "backgroundColor",
                            a = "transparent"
                    }
                    i.toLowerCase().indexOf("height") < 0 && i.toLowerCase().indexOf("width") < 0 && (a = encodeURIComponent(a)),
                        n && "layoutType" === i && (n[i] = a),
                        "bool" == e.type && "transparentBackground" !== e.name && (a = "1" == a || "true" == a ? "true" : "false"),
                        "symbol" !== i && "symbols" !== i || null != a && "" != a && "undefined" !== typeof a || (a = "AAPL"),
                        "null" == a || null == a || "%null" === a || !a || "transparent" === i && "false" === a || ("height" === i || "width" === i) && "100%" === a || (o += "&" + i + "=" + a)
                }),
                    o
            },
            getBooleanValue(e) {
                return "1" == e ? "true" : "0" === e || "false" === e ? "false" : "%null%"
            }
        },
            t._stocktechEditorControls = {
                genericString(e, t, n, l, o, i) {
                    return e = "%null%" != e ? e : n["default_" + o],
                        [
                            wp.element.createElement("label", {
                                class: "stocktech_edit_label",
                                title: i
                            }, l),
                            wp.element.createElement("input", {
                                class: "stocktech_edit_input",
                                type: "text",
                                defaultValue: e,
                                onBlur(e) {
                                    a(e, o, t)
                                }
                            }),
                            wp.element.createElement("button", {
                                class: "components-button is-small stocktech_edit_button"
                            }, "Apply")]
                },
                genericStringWithInput(e, t, n, o, i, r) {
                    return e = "%null%" != e ? e : n["default_" + i],
                        [
                            wp.element.createElement("label", {
                                class: "stocktech_edit_label",
                                title: r
                            }, o),
                            wp.element.createElement("div", {
                                class: "s_b_field_div"
                            },
                                wp.element.createElement("a", {
                                    href: "#",
                                    class: "components-button is-link s_b_symbol_change_link",
                                    onClick() {
                                        stocktech_open_search_modal_from_block(t, "" + i)
                                    }
                                }, e ? "Click here to change" : "Click here to set " + i),
                                wp.element.createElement("input", {
                                    id: "default_" + i,
                                    class: "stocktech_edit_input default_generic_input",
                                    type: "text",
                                    defaultValue: e,
                                    onBlur(e) {
                                        a(e, "" + i, t)
                                    }
                                }),
                                wp.element.createElement("p", {
                                    class: "default_" + i + "_p default_generic_p"
                                }, e), e && wp.element.createElement("a", {
                                    href: "#",
                                    class: "components-button is-link s_b_copy",
                                    onClick() {
                                        return l(e)
                                    }
                                }, "Copy"))]
                },
                genericStringList(e, t, n, l, o, i) {
                    return e = "%null%" != e ? e : n["default_" + o],
                        [wp.element.createElement("label", {
                            class: "stocktech_edit_label",
                            title: i
                        }, l), wp.element.createElement("input", {
                            class: "stocktech_edit_input",
                            type: "text",
                            defaultValue: e,
                            onBlur(e) {
                                a(e, o, t)
                            }
                        }), wp.element.createElement("button", {
                            class: "components-button is-small stocktech_edit_button"
                        }, "Apply")]
                },
                genericBool(e, t, n, l, o, a) {
                    return e = e || n["default_" + o],
                        [wp.element.createElement("label", {
                            class: "stocktech_edit_label"
                        }, l), wp.element.createElement("input", {
                            class: "stocktech_edit_input_checkbox",
                            type: "checkbox",
                            onChange(e) {
                                c(e, o, t)
                            },
                            checked: "1" == e ? "checked" : null
                        })]
                },
                button(value, t, n) {
                    return [
                        wp.element.createElement("label", {
                            class: "stocktech_edit_label"
                        }, " "),
                        wp.element.createElement("button", {
                            class: "components-button is-small stocktech_edit_button"
                        }, "Apply Changes")
                    ]
                },
                symbols(e, t, n) {
                    return e = "%null%" != e ? e : n.default_symbols,
                        [wp.element.createElement("label", {
                            class: "stocktech_edit_label",
                            title: "A list of stock symbols."
                        }, "Symbols"), wp.element.createElement("div", {
                            class: "s_b_field_div"
                        }, wp.element.createElement("a", {
                            href: "#",
                            class: "components-button is-link s_b_symbol_change_link",
                            onClick() {
                                stocktech_open_search_modal_from_block(t)
                            }
                        }, e ? "Click here to change" : "Click here to set symbols"), wp.element.createElement("input", {
                            id: "default_symbols",
                            class: "stocktech_edit_input",
                            type: "text",
                            defaultValue: e,
                            onBlur(e) {
                                a(e, "symbols", t)
                            }
                        }), wp.element.createElement("p", {
                            class: "default_symbols_p"
                        }, e), e && wp.element.createElement("a", {
                            href: "#",
                            class: "components-button is-link s_b_copy",
                            onClick() {
                                return l(e)
                            }
                        }, "Copy"))]
                },
                width(value, t, n) {
                    return value = "%null%" != value ? value : n.default_width,
                        "100%" === value && (value = ""),
                        [wp.element.createElement("label", {
                            class: "stocktech_edit_label"
                        }, "Width"), wp.element.createElement("input", {
                            class: "stocktech_edit_input",
                            type: "text",
                            onBlur(value) {
                                a(value, "width", t)
                            },
                            defaultValue: value
                        }), wp.element.createElement("button", {
                            class: "components-button is-small stocktech_edit_button"
                        }, "Apply")]
                },
                height(e, t, n) {
                    return e = "%null%" != e ? e : n.default_height,
                        "100%" === e && (e = ""),
                        [wp.element.createElement("label", {
                            class: "stocktech_edit_label"
                        }, "Height"), wp.element.createElement("input", {
                            class: "stocktech_edit_input",
                            type: "text",
                            onBlur(e) {
                                a(e, "height", t)
                            },
                            defaultValue: e
                        }), wp.element.createElement("button", {
                            class: "components-button is-small stocktech_edit_button"
                        }, "Apply")]
                },
                title(value, t, n) {
                    return value = "%null%" != value ? value : n.default_title,
                        "StockTech Alerts" === value && (value = ""),
                        [wp.element.createElement("label", {
                            class: "stocktech_edit_label"
                        }, "Title"), wp.element.createElement("input", {
                            class: "stocktech_edit_input",
                            type: "text",
                            onBlur(value) {
                                a(value, "title", t)
                            },
                            defaultValue: value
                        }), wp.element.createElement("button", {
                            class: "components-button is-small stocktech_edit_button"
                        }, "Apply")]
                },
                culture(value, t, n) {
                    return value = value || n.default_culture,
                        [wp.element.createElement("label", {
                            class: "stocktech_edit_label"
                        }, "Culture"), wp.element.createElement("form", {
                            class: "stocktech_edit_form",
                            onSubmit(value) {
                                o(value, "culture", t)
                            }
                        }, wp.element.createElement("select", {
                            class: "stocktech_edit_select",
                            id: "select-culture",
                            value: value,
                            onChange(value) {
                                o(value, "culture", t)
                            }
                        },
                            wp.element.createElement("option", {
                                value: "English-US"
                            }, "English-US")))]
                },
                style(e, t, n) {
                    return e = e || n.default_style,
                        [wp.element.createElement("label", {
                            class: "stocktech_edit_label"
                        }, "Style"), wp.element.createElement("form", {
                            class: "stocktech_edit_form",
                            onSubmit(e) {
                                o(e, "style", t)
                            }
                        }, wp.element.createElement("select", {
                            class: "stocktech_edit_select",
                            id: "select-style",
                            value: e,
                            onChange(e) {
                                o(e, "style", t)
                            }
                        }))]
                },
                font(e, t, n) {
                    return e = "%null%" != e ? e : n.default_font,
                        [wp.element.createElement("label", {
                            class: "stocktech_edit_label"
                        }, "Font"), wp.element.createElement("input", {
                            class: "stocktech_edit_input",
                            type: "text",
                            onBlur(e) {
                                a(e, "font", t)
                            },
                            defaultValue: e
                        }), wp.element.createElement("button", {
                            class: "components-button is-small stocktech_edit_button"
                        }, "Apply")]
                },
                transparentBackground(e, t, n) {
                    return e = e || n.default_transparentBackground,
                        [wp.element.createElement("label", {
                            class: "stocktech_edit_label"
                        }, "Transparent Background"), wp.element.createElement("input", {
                            class: "stocktech_edit_input_checkbox",
                            type: "checkbox",
                            onChange(e) {
                                r(e, "transparentBackground", t)
                            },
                            checked: "1" == e ? "checked" : null
                        })]
                },
                language(e, t, n) {
                    return e = e || n.default_language,
                        [
                            wp.element.createElement("label", {
                                class: "stocktech_edit_label",
                                title: "Specifies the native language for the news."
                            }, "Language"),
                            wp.element.createElement("form", {
                                class: "stocktech_edit_form",
                                onSubmit(e) {
                                    o(e, "language", t)
                                }
                            },
                                wp.element.createElement("select", {
                                    class: "stocktech_edit_select",
                                    id: "select-language",
                                    value: e,
                                    onChange(e) {
                                        o(e, "language", t)
                                    }
                                },
                                    wp.element.createElement("option", {
                                        value: "",
                                        selected: "selected"
                                    }, "None"),
                                    wp.element.createElement("option", {
                                        value: "English"
                                    }, "English")))]
                }
            },
            t._stocktechEditorControlsAttributes = {
                getColorAttribute(e) {
                    return {
                        type: "string",
                        default: null != e ? e : ""
                    }
                },
                getStringAttribute(e) {
                    return {
                        type: "string",
                        default: null != e ? e : "%null%"
                    }
                },
                getSelectAttribute(e) {
                    return {
                        type: "string",
                        default: null != e ? e : null
                    }
                },
                getBoolenAttribute(e) {
                    return {
                        type: "string",
                        default: null != e ? e : null
                    }
                }
            }
    }
    , function (e, t) {
        var n = function () {
            function e(e, t) {
                var n = []
                    , l = !0
                    , o = !1
                    , a = void 0;
                try {
                    for (var i, r = e[Symbol.iterator](); !(l = (i = r.next()).done) && (n.push(i.value),
                        !t || n.length !== t); l = !0)
                        ;
                } catch (e) {
                    o = !0,
                        a = e
                } finally {
                    try {
                        !l && r.return && r.return()
                    } finally {
                        if (o)
                            throw a
                    }
                }
                return n
            }
            return function (t, n) {
                if (Array.isArray(t))
                    return t;
                if (Symbol.iterator in Object(t))
                    return e(t, n);
                throw new TypeError("Invalid attempt to destructure non-iterable instance")
            }
        }()
            , l = wp.components
            , o = l.Button
            , a = l.ColorPicker
            , i = l.ColorIndicator
            , r = l.TextControl
            , c = l.Modal
            , s = l.Dropdown
            , m = l.Tooltip
            , u = wp.element.useState
            , p = function (e) {
                var t = u(!1)
                    , l = n(t, 2)
                    , a = l[0]
                    , i = l[1]
                    , r = u({})
                    , s = n(r, 1)
                    , m = s[0];
                return wp.element.createElement("div", null, wp.element.createElement("label", {
                    class: "stocktech_edit_label"
                }, "Colors"), wp.element.createElement(o, {
                    isSecondary: !0,
                    onClick() {
                        return i(!0)
                    },
                    className: "components-button is-link"
                }, "Click here to customize"), a && wp.element.createElement(c, {
                    shouldCloseOnClickOutside: !1,
                    title: "Custom Colors",
                    className: "stocktech_modal_colors",
                    onRequestClose() {
                        i(!1);
                        var t = void 0;
                        Object.keys(m).forEach(function (n) {
                            t = {},
                                t[n.toLowerCase()] = m[n],
                                e.setAttributes(t)
                        })
                    }
                }, wp.element.createElement("div", {
                    class: "stocktech_cc_container"
                }, e.colors.map(function (e, t) {
                    return wp.element.createElement(d, {
                        label: e.name,
                        color: e.value,
                        attrName: e.attrName,
                        onChange(t) {
                            m[e.attrName] = t
                        }
                    })
                })), wp.element.createElement("div", {
                    class: "stocktech_cc_note"
                }, wp.element.createElement("p", null, " NOTE: colors will be applied when this dialog is closed."))))
            }
            , d = function (e) {
                var t = u(e.color)
                    , l = n(t, 2)
                    , o = l[0]
                    , a = l[1];
                return wp.element.createElement("div", {
                    class: "stocktech_color_component"
                }, wp.element.createElement("label", {
                    class: "stocktech_color_component_label"
                }, e.label), wp.element.createElement("div", {
                    class: "stocktech_div_custom_color"
                }, wp.element.createElement("div", {
                    class: "stocktech_div_inline_comp stocktech_color_indicator_parent"
                }, wp.element.createElement(i, {
                    colorValue: o
                })), wp.element.createElement("div", {
                    class: "stocktech_div_inline_comp stocktech_color_component_input_parent"
                }, wp.element.createElement(r, {
                    value: o,
                    onChange(t) {
                        a(t),
                            e.onChange(t)
                    }
                })), wp.element.createElement("div", {
                    class: "stocktech_div_inline_comp stocktech_cpalette"
                }, wp.element.createElement(E, {
                    color: o,
                    label: e.label + " Picker",
                    onChange(t) {
                        a(t),
                            e.onChange(t)
                    }
                }))))
            }
            , E = function (e) {
                return wp.element.createElement(s, {
                    className: "components-color-palette__item-wrapper components-color-palette__custom-color",
                    contentClassName: "components-color-palette__picker",
                    renderToggle(t) {
                        var n = t.isOpen
                            , l = t.onToggle;
                        return wp.element.createElement(m, {
                            text: e.label
                        }, wp.element.createElement("button", {
                            type: "button",
                            "aria-expanded": n,
                            className: "components-color-palette__item stocktech_colorpicker",
                            onClick: l,
                            "aria-label": e.label
                        }, wp.element.createElement("span", {
                            className: "components-color-palette__custom-color-gradient"
                        })))
                    },
                    renderContent(t) {
                        t.onToggle;
                        return wp.element.createElement("div", {
                            class: "stocktech_cp_container"
                        }, wp.element.createElement(a, {
                            color: e.color,
                            onChangeComplete(t) {
                                e.onChange(t.hex)
                            },
                            disableAlpha: !0
                        }))
                    }
                })
            };
        t._ColorsModal = p
    }
]);
