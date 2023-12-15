const inherit = function(parent,child){
    const Surrogate = function(){};
    Surrogate.prototype = parent.prototype;
    child.prototype = new child;
};

module.exports = inherit;