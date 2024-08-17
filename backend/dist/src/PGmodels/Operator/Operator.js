function _assert_this_initialized(self) {
    if (self === void 0) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }
    return self;
}
function _class_call_check(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}
function _define_property(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else {
        obj[key] = value;
    }
    return obj;
}
function _get_prototype_of(o) {
    _get_prototype_of = Object.setPrototypeOf ? Object.getPrototypeOf : function getPrototypeOf(o) {
        return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _get_prototype_of(o);
}
function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function");
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, {
        constructor: {
            value: subClass,
            writable: true,
            configurable: true
        }
    });
    if (superClass) _set_prototype_of(subClass, superClass);
}
function _possible_constructor_return(self, call) {
    if (call && (_type_of(call) === "object" || typeof call === "function")) {
        return call;
    }
    return _assert_this_initialized(self);
}
function _set_prototype_of(o, p) {
    _set_prototype_of = Object.setPrototypeOf || function setPrototypeOf(o, p) {
        o.__proto__ = p;
        return o;
    };
    return _set_prototype_of(o, p);
}
function _type_of(obj) {
    "@swc/helpers - typeof";
    return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj;
}
function _is_native_reflect_construct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;
    try {
        Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}));
        return true;
    } catch (e) {
        return false;
    }
}
function _create_super(Derived) {
    var hasNativeReflectConstruct = _is_native_reflect_construct();
    return function _createSuperInternal() {
        var Super = _get_prototype_of(Derived), result;
        if (hasNativeReflectConstruct) {
            var NewTarget = _get_prototype_of(this).constructor;
            result = Reflect.construct(Super, arguments, NewTarget);
        } else {
            result = Super.apply(this, arguments);
        }
        return _possible_constructor_return(this, result);
    };
}
import { Model, DataTypes } from "sequelize";
import { centralDatabase } from "../../config/dbconfig.js";
var CinemaOperator = /*#__PURE__*/ function(Model) {
    "use strict";
    _inherits(CinemaOperator, Model);
    var _super = _create_super(CinemaOperator);
    function CinemaOperator() {
        _class_call_check(this, CinemaOperator);
        var _this;
        _this = _super.apply(this, arguments);
        _define_property(_assert_this_initialized(_this), "id", void 0);
        _define_property(_assert_this_initialized(_this), "name", void 0);
        _define_property(_assert_this_initialized(_this), "city_name", void 0);
        _define_property(_assert_this_initialized(_this), "email", void 0);
        _define_property(_assert_this_initialized(_this), "passwordHash", void 0);
        _define_property(_assert_this_initialized(_this), "phone", void 0);
        _define_property(_assert_this_initialized(_this), "dob", void 0);
        _define_property(_assert_this_initialized(_this), "profileImage", void 0);
        _define_property(_assert_this_initialized(_this), "govIdType", void 0);
        _define_property(_assert_this_initialized(_this), "govIdNumber", void 0);
        _define_property(_assert_this_initialized(_this), "govIdImage", void 0);
        // Timestamps
        _define_property(_assert_this_initialized(_this), "createdAt", void 0);
        _define_property(_assert_this_initialized(_this), "updatedAt", void 0);
        return _this;
    }
    return CinemaOperator;
}(Model);
CinemaOperator.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    city_name: {
        type: DataTypes.STRING,
        allowNull: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    passwordHash: {
        type: DataTypes.STRING,
        allowNull: false
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false
    },
    dob: {
        type: DataTypes.DATEONLY,
        allowNull: true
    },
    profileImage: {
        type: DataTypes.STRING,
        allowNull: true
    },
    govIdType: {
        type: DataTypes.STRING,
        allowNull: true
    },
    govIdNumber: {
        type: DataTypes.STRING,
        allowNull: true
    },
    govIdImage: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    sequelize: centralDatabase.getInstance(),
    modelName: "CinemaOperator",
    timestamps: true
});
export { CinemaOperator };
