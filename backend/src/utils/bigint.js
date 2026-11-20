// Cho phép res.json() serialize cột BigInt (VD: activity_logs.id)
BigInt.prototype.toJSON = function () {
  return this.toString();
};
