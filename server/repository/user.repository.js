const { User } = require('../models/User');

exports.findUserById = async (id) => {
  try {
    return await User.findOne({ kakaoId: id });
  } catch (error) {
    throw new Error(`Failed to find User by kakao ID : ${err.message}`);
  }
};

exports.findUserAndUpdate = async (user) => {
  const id = user.id;
  const nickname = user.properties.nickname;

  try {
    return await User.findOneAndUpdate(
      { kakaoId: id },
      { $set: { nickname: nickname, updatedAt: Date.now() } },
      { upsert: true, new: true },
    );
  } catch (error) {
    throw new Error(`Failed to find and update User by kakao ID : ${err.message}`);
  }
};
