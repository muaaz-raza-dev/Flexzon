const NestedLengthCalculator = (object:{[key:string]:any[]}) => {
return length = Object.values(object).flat(Infinity).length
}

export default NestedLengthCalculator

