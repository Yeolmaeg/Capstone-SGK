const service = require("../services/addressService");

exports.addAddress = async (req, res) => {
  const { user_id, name, address, latitude, longitude } = req.body;
  try {
    await service.addAddress({ user_id, name, address, latitude, longitude });
    res.status(201).json({ message: "주소 추가 완료" });
  } catch (err) {
    res.status(500).json({ error: "주소 추가 실패" });
  }
};

exports.getAddresses = async (req, res) => {
  const { user_id } = req.query;
  try {
    const addresses = await service.getAddresses(user_id);
    res.json(addresses);
  } catch (err) {
    res.status(500).json({ error: "주소 목록 조회 실패" });
  }
};

exports.getAddressById = async (req, res) => {
    const { id } = req.params;
    try {
      const address = await service.getAddressById(id);
      if (!address) {
        return res.status(404).json({ error: "주소를 찾을 수 없습니다." });
      }
      res.json(address);
    } catch (err) {
      res.status(500).json({ error: "주소 조회 실패" });
    }
  };
  

exports.updateAddress = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    await service.updateAddress(id, name);
    res.json({ message: "주소 이름 수정 완료" });
  } catch (err) {
    res.status(500).json({ error: "주소 이름 수정 실패" });
  }
};

exports.deleteAddress = async (req, res) => {
  const { id } = req.params;
  try {
    await service.deleteAddress(id);
    res.json({ message: "주소 삭제 완료" });
  } catch (err) {
    res.status(500).json({ error: "주소 삭제 실패" });
  }
};

exports.reverseGeocode = async (req, res) => {
  const { lat, lng } = req.query;
  try {
    const result = await service.getAddressFromCoords(lat, lng);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: "역지오코딩 실패" });
  }
};

exports.geocode = async (req, res) => {
  const { address } = req.query;
  try {
    const result = await service.getCoordsFromAddress(address);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: "지오코딩 실패" });
  }
};