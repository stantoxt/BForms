﻿(function (factory) {
    if (typeof define === "function" && define.amd) {
        define(['jquery',
        'selectInput2',
        'typeaheadSelect',
        'radioButtonsList',
        'checkBoxList',
        'bDatepicker',
        'bRangepicker',
        'bDatepicker-i18n'], factory);
    } else {
        factory(window.jQuery);
    }

})(function ($) {
    $.fn.styleInputsDefaults = {
        select2: true,
        select2Selector: '.bs-dropdown:not(.no-select2), .bs-dropdown-grouped:not(.no-select2)',

        multiSelect2: true,
        multiSelect2Selector: '.bs-listbox:not(.no-select2), .bs-listbox-grouped:not(.no-select2)',

        autocomplete: true,
        autocompleteSelector: '.bs-autocomplete',

        radioButtons: true,
        radioButtonsSelector: '.bs-radio-list',

        checkBoxList: true,
        checkBoxListSelector: '.bs-checkbox-list',

        tagList: true,
        tagListSelector: '.bs-tag-list',

        datepicker: true,
        datepickerSelector: '.bs-date',

        timepicker: true,
        timepickerSelector: '.bs-time',

        datetimepicker: true,
        datetimepickerSelector: '.bs-datetime',

        datetimerange: true,
        datetimerangeSelector: '.bs-datetime-range',

        daterange: true,
        daterangeSelector: '.bs-date-range',

        timerange: true,
        timerangeSelector: '.bs-time-range',

        loadingSelector: '.loading',
        loadingClass: 'loading'
    };

    $.fn.styleInputs = function (opts) {
        return new styleInputs($(this), $.extend(true, {}, $.fn.styleInputsDefaults, opts));
    };

    var styleInputs = (function ($, undefined) {

        var StyleInputs = function ($elem, opts) {
            this.$elem = $elem;
            this.options = opts;
            this._applyStyles();
        };


        StyleInputs.prototype._getOptions = function (elem) {
            return $.extend(true, {}, $(elem).data('options'));
        };

        StyleInputs.prototype._applyStyles = function () {
            var self = this,
                datepickerLanguage = 'en';
            if (requireConfig && requireConfig.websiteOptions) {
                var locale = requireConfig.websiteOptions.locale;

                if (typeof moment.langData(locale) !== "undefined") {
                    datepickerLanguage = locale;
                }
            }

            if (this.options.select2 === true) {
                if (typeof $.fn.select2 === "function") {
                    this.$elem.find(this.options.select2Selector).each(function () {
                        $(this).select2(self._getOptions(this));
                    });
                } else {
                    throw "Select2 script must be loaded before calling styleInputs";
                }
            }

            if (this.options.tagList === true && this.$elem.find(this.options.tagListSelector).length) {
                if (typeof $.fn.selectInput2 === "function") {
                    this.$elem.find(this.options.tagListSelector).each(function () {
                        $(this).selectInput2(self._getOptions(this));
                    });
                } else {
                    throw "SelectInput2 script must be loaded before calling styleInputs";
                }
            }

            if (this.options.multiSelect2 === true && this.$elem.find(this.options.multiSelect2Selector).length) {
                if (typeof $.fn.selectInput2 === "function") {
                    this.$elem.find(this.options.multiSelect2Selector).each(function () {
                        $(this).selectInput2($.extend(true, {}, {
                            tags: false
                        }, self._getOptions(this)));
                    });
                } else {
                    throw "SelectInput2 script must be loaded before calling styleInputs";
                }
            }

            if (this.options.autocomplete === true && this.$elem.find(this.options.autocompleteSelector).length) {
                if (typeof $.fn.typeaheadSelect === "function") {
                    this.$elem.find(this.options.autocompleteSelector).each(function () {
                        $(this).typeaheadSelect(self._getOptions(this));
                    });
                } else {
                    throw "TypeaheadSelect script must be loaded before calling styleInputs";
                }
            }

            if (this.options.radioButtons === true) {
                if (typeof $.fn.radioButtonsList === "function") {
                    this.$elem.find(this.options.radioButtonsSelector).each(function () {
                        $(this).radioButtonsList(self._getOptions(this));
                    });
                } else {
                    throw "radioButtonsList script must be loaded before calling styleInputs";
                }
            }

            if (this.options.checkBoxList === true) {
                if (typeof $.fn.checkBoxList === "function") {
                    this.$elem.find(this.options.checkBoxListSelector).each(function () {
                        $(this).checkBoxList(self._getOptions(this));
                    });
                } else {
                    throw "CheckBoxList script must be loaded before calling styleInputs";
                }
            }

            if (this.options.datepicker === true && this.$elem.find(this.options.datepickerSelector).length) {
                if (typeof $.fn.bDatepicker === "function") {
                    this.$elem.find(this.options.datepickerSelector).each(function (idx, elem) {
                        var $elem = $(elem);
                        $elem.attr('type', 'text');

                        var $valueField = $('.bs-date-iso[data-for="' + $elem.prop('name') + '"]');

                        $elem.bDatepicker($.extend(true, {}, self._getOptions(this), {
                            type: 'datepicker',
                            altFields: [{
                                selector: $valueField
                            }],
                            initialValue: $valueField.val(),
                            language: datepickerLanguage
                        }));
                    });
                }
                else {
                    throw "bDatepicker script must be loaded before calling styleInputs";
                }
            }

            if (this.options.timepicker === true && this.$elem.find(this.options.timepickerSelector).length) {
                if (typeof $.fn.bDatepicker === "function") {
                    this.$elem.find(this.options.timepickerSelector).each(function (idx, elem) {
                        var $elem = $(elem);
                        $elem.attr('type', 'text');

                        var $valueField = $('.bs-date-iso[data-for="' + $elem.prop('name') + '"]');

                        $elem.bDatepicker($.extend(true, {}, self._getOptions(this), {
                            type: 'timepicker',
                            is12Hours: true,
                            altFields: [{
                                selector: $valueField
                            }],
                            initialValue: $valueField.val(),
                            language: datepickerLanguage
                        }));
                    });
                }
                else {
                    throw "bDatepicker script must be loaded before calling styleInputs";
                }
            }

            if (this.options.datetimepicker === true && this.$elem.find(this.options.datetimepickerSelector).length) {
                if (typeof $.fn.bDatepicker === "function") {
                    this.$elem.find(this.options.datetimepickerSelector).each(function (idx, elem) {
                        var $elem = $(elem);

                        $elem.attr('type', 'text');

                        var $valueField = $('.bs-date-iso[data-for="' + $elem.prop('name') + '"]');

                        $elem.bDatepicker($.extend(true, {}, self._getOptions(this), {
                            type: 'datetimepicker',
                            is12Hours: true,
                            altFields: [{
                                selector: $valueField
                            }],
                            initialValue: $valueField.val(),
                            language: datepickerLanguage
                        }));
                    });
                }
                else {
                    throw "bDatepicker script must be loaded before calling styleInputs";
                }
            }

            if (this.options.datetimerange === true && this.$elem.find(this.options.datetimerangeSelector).length) {
                if (typeof $.fn.bRangepicker === "function") {
                    this.$elem.find(this.options.datetimerangeSelector).each(function (idx, elem) {

                        var $elem = $(elem);
                        var rangeName = $elem.prop('name');

                        $elem.attr('type', 'text');

                        var $startInput = $('.bs-range-from[data-for="' + rangeName + '"]'),
                            $endInput = $('.bs-range-to[data-for="' + rangeName + '"]');

                        $elem.bRangepicker($.extend(true, {}, self._getOptions(this), {
                            startOptions: {
                                type: 'datetimepicker',
                                initialValue: $startInput.val(),
                                defaultDate: (typeof $endInput.val() !== "undefined" && $endInput.val() != '') ? "-1d" : "now",
                                defaultDateValue: (typeof $endInput.val() !== "undefined" && $endInput.val() != '') ? $endInput.val() : false,
                                language: datepickerLanguage
                            },
                            endOptions: {
                                type: 'datetimepicker',
                                initialValue: $endInput.val(),
                                language: datepickerLanguage
                            },

                            startAltFields: [{ selector: $startInput }],
                            endAltFields: [{ selector: $endInput }],
                            language: locale
                        }));
                    });
                }
                else {
                    throw "bRangepicker script must be loaded before calling styleInputs";
                }
            }

            if (this.options.daterange === true && this.$elem.find(this.options.daterangeSelector).length) {
                if (typeof $.fn.bRangepicker === "function") {
                    this.$elem.find(this.options.daterangeSelector).each(function (idx, elem) {

                        var $elem = $(elem);
                        var rangeName = $elem.prop('name');

                        var $startInput = $('.bs-range-from[data-for="' + rangeName + '"]'),
                           $endInput = $('.bs-range-to[data-for="' + rangeName + '"]');

                        $elem.bRangepicker($.extend(true, {}, self._getOptions(this), {
                            startOptions: {
                                type: 'datepicker',
                                initialValue: $startInput.val(),
                                defaultDate: (typeof $endInput.val() !== "undefined" && $endInput.val() != '') ? "-1d" : "now",
                                defaultDateValue: (typeof $endInput.val() !== "undefined" && $endInput.val() != '') ? $endInput.val() : false,
                                language: datepickerLanguage
                            },
                            endOptions: {
                                type: 'datepicker',
                                initialValue: $endInput.val(),
                                language: datepickerLanguage
                            },
                            startAltFields: [{ selector: $startInput }],
                            endAltFields: [{ selector: $endInput }],
                            language: locale
                        }));
                    });
                }
                else {
                    throw "bRangepicker script must be loaded before calling styleInputs";
                }
            }

            if (this.options.timerange === true && this.$elem.find(this.options.timerangeSelector).length) {
                if (typeof $.fn.bRangepicker === "function") {
                    this.$elem.find(this.options.timerangeSelector).each(function (idx, elem) {

                        var $elem = $(elem);
                        var rangeName = $elem.prop('name');

                        var $startInput = $('.bs-range-from[data-for="' + rangeName + '"]'),
                           $endInput = $('.bs-range-to[data-for="' + rangeName + '"]');

                        $elem.bRangepicker($.extend(true, {}, self._getOptions(this), {
                            startOptions: {
                                type: 'timepicker',
                                initialValue: $startInput.val(),
                                defaultDate: (typeof $endInput.val() !== "undefined" && $endInput.val() != '') ? "-1h" : "now",
                                defaultDateValue: (typeof $endInput.val() !== "undefined" && $endInput.val() != '') ? $endInput.val() : false,
                                language: datepickerLanguage
                            },
                            endOptions: {
                                type: 'timepicker',
                                language: datepickerLanguage,
                                initialValue: $endInput.val()
                            },

                            startAltFields: [{ selector: $startInput }],
                            endAltFields: [{ selector: $endInput }],
                            language: locale
                        }));
                    });
                }
                else {
                    throw "bRangepicker script must be loaded before calling styleInputs";
                }
            }

            //remove loading
            var timeoutHandler = window.setTimeout($.proxy(function () {

                if (this.$elem.hasClass(this.options.loadingClass)) {
                    this.$elem.removeClass(this.options.loadingClass);
                } else {
                    this.$elem.find(this.options.loadingSelector).removeClass(this.options.loadingClass);
                }

                window.clearTimeout(timeoutHandler);
            }, this), 0);
        };

        return StyleInputs;
    })(jQuery);


    // GLYPHICON CLICK EVENT
    // ====================
    $(function () {
        $('body').on('click', '.input-group-addon', function () {
            var $next = $(this).next();

            if (!$next.is(':visible') || !$next.is('input, select'))
                $next = $next.find('input:visible, select:visible').first();

            $next.trigger('focus');
        });
    });

    return styleInputs;
});