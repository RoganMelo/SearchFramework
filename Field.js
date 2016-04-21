var Field = function (id, type) {
    //vars
    this.id = id;
    this.elem = $("[data-name-field = '" + id + "']");
    this.condition;
    this.type = type;
    this.result = [];

    //methods
    this.setCondition = function () {
        if (type == "text") {
            this.condition = function (i, elem) {
                var value = this.elem.val();
                var v = elem.children("[data-field='" + this.id + "']").text();

                if (value != "")
                    if (~v.toLowerCase().indexOf(value.toLowerCase())){
                        this.addResult(elem);
                    } else {
                        this.addResult(-1);
                    }
                    //else {
                      //  this.addResult(elem.children("[data-field='" + this.id + "']"));
                    //}
            };
        } else {
            this.condition = function (i, elem) {
                var value = this.elem.val();
                var v = elem.children("[data-field='" + this.id + "']").text();

                if (value != 0)
                    if (v == value){
                        this.addResult(elem);
                    } else {
                        this.addResult(-1);
                    }
                    //else {
                      //  this.addResult(elem.children("[data-field='" + this.id + "']"));
                    //}
            };
        }
    };

    this.addResult = function (result) {
        this.result.push(result);
    };

    this.getResult = function (itens) {
        this.result = [];

        for (var i = 0; i < itens.length; i++)
            this.condition(i, itens.eq(i));

        if (this.isNotExist(this.result))
            return [-1];
        else
            return this.result;
    };

    this.isNotExist = function (result) {
        var control = 0;
        for (var i = 0; i < result.length; i++)
            if (result[i] == -1)
                control++;

        if (result.length == 0)
            return false;

        return (control == result.length);
    };

    this.setEvent = function (event) {
        switch (this.type) {
            case "text":
                this.elem.keyup(event);
                break;
            default:
                this.elem.change(event);
        }
    };

    //constructors
    this.setCondition();
};
