import Contact from "../models/contact";

export const create = async (req, res) => {
    try {
        const contact = await new Contact(req.body).save();
        res.json(contact);
    } catch (error) {
        res.status(400).json({
            message: "Gửi liên hệ không thành công",
            error
        });
    }
};

export const read = async (req, res) => {
    const filter = { _id: req.params.id };

    const populate = req.query["_expand"];

    try {
        const contact = await Contact.findOne(filter).select("-__v").populate(populate).exec();
        res.json(contact);
    } catch (error) {
        res.status(400).json({
            message: "Không tìm thấy liên hệ",
            error
        });
    }
};

export const list = async (req, res) => {
    const populate = req.query["_expand"];
    
    let sortOpt = {};
    if (req.query["_sort"]) {
        const sortArr = req.query["_sort"].split(",");
        const orderArr = (req.query["_order"] || "").split(",");
        
        sortArr.forEach((sort, index) => {
            sortOpt[sort] = orderArr[index] === "desc" ? -1 : 1;
        });
    }

    try {
        const contacts = await Contact.find({}).select("-__v").populate(populate).sort(sortOpt).exec();
        res.json(contacts);
    } catch (error) {
        res.status(400).json({
            message: "Không tìm thấy liên hệ",
            error
        });
    }
};

export const update = async (req, res) => {
    const filter = { _id: req.params.id };
    const update = req.body;
    const options = { new: true };

    try {
        const contact = await Contact.findOneAndUpdate(filter, update, options).exec();
        res.json(contact);
    } catch (error) {
        res.status(400).json({
            message: "Cập nhật liên hệ thất bại",
            error
        });
    }
};

export const remove = async (req, res) => {
    const filter = { _id: req.params.id };

    try {
        const contact = await Contact.findOneAndDelete(filter).exec();
        res.json(contact);
    } catch (error) {
        res.status(400).json({
            message: "Xóa liên hệ không thành công",
            error
        });
    }
};