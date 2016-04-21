var Search = function (id, fields) {
    //vars
    this.id = id;
    this.fields = fields;
    this.painel;
    this.results = [];
    var _this = this;

    //methods
    this.setPainel = function () {
        this.painel = new Painel($("[data-search='" + this.id + "'][data-painel]"));
    };

    this.setEvents = function () {
        for (var i = 0; i < this.fields.length; i++)
            this.fields[i].setEvent(this.Event);
    };

    this.Event = function () {
        _this.results = [];

        for (var i = 0; i < _this.fields.length; i++) {
            var r = _this.fields[i].getResult(_this.painel.getItens());
            if(r.length > 0)
                _this.results.push(r);
        }
            

        if (_this.results.length == 0) {
            _this.painel.SelectedItens(_this.painel.getItens()); //Retorna Todos
        } else {
            if (_this.results[0] == -1) {
                _this.painel.SelectedItens([]);
                return;
            }
                
            var intersection = _this.convertDOM(_this.results[0]);
            var next;
            for (var i = 1; i < _this.results.length; i++) {
                if (_this.results[i] == -1) {
                    _this.painel.SelectedItens([]);
                    return;
                }
                    
                next = _this.convertDOM(_this.results[i]);
                intersection = $.intersect(intersection, next);
            }
            
            _this.painel.SelectedItens(intersection);
        }
        
        //var m1 = _this.convertDOM(_this.results[0]);

        //if (_this.fields.length == 1) {
        //    if (m1.length == 0) {
        //        m1 = _this.convertDOM(_this.painel.getItens());
        //    }

        //    _this.painel.SelectedItens(m1);
        //} else if (_this.fields.length > 1) {
        //    for (var i = 1; i < _this.fields.length; i++) {
        //        var m2 = _this.convertDOM(_this.results[i]);

        //        if (m1.length == 0) {
        //            if (m2.length != 0) {
        //                m1 = m2;
        //            } else {
        //                m1 = _this.painel.getItens();
        //            }
        //        } else {
        //            if (m2.length != 0)
        //                m1 = $.intersect(m1, m2);
        //        }

        //        _this.painel.SelectedItens(m1);
        //    }
        //} else {
        //    throw new Error('Must be at least one field in the array!');
        //}

        //var m1 = _this.convertDOM(_this.results[0]);
        //var m2 = _this.convertDOM(_this.results[1]);

        //if (m1.length == 0) {
        //    if (m2.length != 0) {
        //        _this.painel.SelectedItens(m2);
        //    } else {
        //        _this.painel.SelectedItens(_this.painel.getItens());
        //    }
        //} else {
        //    if (m2.length == 0) {
        //        _this.painel.SelectedItens(m1);
        //    } else {
        //        _this.painel.SelectedItens($.intersect(m1, m2));
        //    }
        //}
    };

    this.convertDOM = function (list) {
        var array = [];
        for (var k = 0; k < list.length; k++)
            array.push(list[k][0]);

        return array;
    };

    //constructors
    this.setPainel();
    this.setEvents();
};