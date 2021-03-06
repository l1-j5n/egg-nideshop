/*
 * @Author: qiao
 * @Date: 2018-07-01 09:41:41
 * @Last Modified by: qiao
 * @Last Modified time: 2018-07-14 18:08:48
 * 货物表
 */
import { Application } from 'egg';
import Sequelize, { INTEGER, STRING, DECIMAL, TINYINT, Instance } from 'sequelize';
import { IGoodSpecificationInst } from './good_specification';
import { IProductInst } from './product';

export interface IGoodAttr {
  id: number;
  category_id: number;
  goods_sn: string;
  name: string;
  brand_id: number;
  goods_number: number;
  keywords: string;
  goods_brief: string;
  goods_desc: string;
  is_on_sale: number;
  add_time: number;
  sort_order: number;
  is_delete: number;
  attribute_category: number;
  counter_price: number;
  extra_price: number;
  is_new: number;
  goods_unit: string;
  primary_pic_url: string;
  list_pic_url: string;
  retail_price: number;
  sell_volume: number;
  primary_product_id: number;
  unit_price: number;
  promotion_desc: string;
  promotion_tag: string;
  app_exclusive_price: number;
  is_app_exclusive: number;
  is_limited: number;
  is_hot: number;
}

export interface IGoodInst extends Instance<IGoodAttr>, IGoodAttr {
}

interface IGoodModel extends Sequelize.Model<IGoodInst, IGoodAttr> {
  getSpecificationList: (goodsId: number) => Promise<ISpecificationList[]>;
  getProductList: (goodsId: number) => PromiseLike<IProductInst[]>;
}

interface ISpecificationList {
  specification_id: number;
  name: string;
  valueList: IGoodSpecificationInst[];
}

export default (app: Application) => {
  const sequelize = app.model;
  const tablePrefix = app.config.sequelize.tablePrefix;

  // TODO: mysql里面这张表定义ENGINE，这里没有定义
  const good = sequelize.define(tablePrefix + 'good', {
    id: {
      type: INTEGER(11).UNSIGNED,
      primaryKey: true,
    },

    category_id: {
      type: INTEGER(11).UNSIGNED,
      allowNull: false,
      defaultValue: 0,
      comment: '货物所属分类id',
    },

    goods_sn: {
      type: STRING(60),
      allowNull: false,
      defaultValue: '',
      comment: '??',
    },

    name: {
      type: STRING(120),
      allowNull: false,
      defaultValue: '',
    },

    brand_id: {
      type: INTEGER(11).UNSIGNED,
      allowNull: false,
      defaultValue: 0,
    },

    goods_number: {
      type: Sequelize.MEDIUMINT(8).UNSIGNED,
      allowNull: false,
      defaultValue: 0,
    },

    keywords: {
      type: STRING(255),
      allowNull: false,
      defaultValue: '',
    },

    goods_brief: {
      type: STRING(255),
      allowNull: false,
      defaultValue: '',
    },

    goods_desc: {
      type: Sequelize.TEXT,
      comment: '货物描述，都是一些图片链接',
    },

    is_on_sale: {
      type: TINYINT(1).UNSIGNED,
      allowNull: false,
      defaultValue: 1,
      comment: '货物是否正在上架：1 正在上架，0 已下架',
    },

    add_time: {
      type: INTEGER(10).UNSIGNED,
      allowNull: false,
      defaultValue: 0,
      comment: '货物添加时间',
    },

    sort_order: {
      type: Sequelize.SMALLINT(4).UNSIGNED,
      allowNull: false,
      defaultValue: 100,
      comment: '???',
    },

    is_delete: {
      type: TINYINT(1).UNSIGNED,
      allowNull: false,
      defaultValue: 0,
      comment: '是否被删除：0 没有被删除， 1被删除',
    },

    attribute_category: {
      type: INTEGER(11).UNSIGNED,
      allowNull: false,
      defaultValue: 0,
      comment: '属性分类？？',
    },

    counter_price: {
      type: DECIMAL(10, 2).UNSIGNED,
      allowNull: false,
      defaultValue: 0,
      comment: '专柜价格',
    },

    extra_price: {
      type: DECIMAL(10, 2).UNSIGNED,
      allowNull: false,
      defaultValue: 0,
      comment: '附加价格',
    },

    is_new: {
      type: TINYINT(1).UNSIGNED,
      allowNull: false,
      defaultValue: 0,
      comment: '是否新品上架： ？？',
    },

    goods_unit: {
      type: STRING(45),
      allowNull: false,
      comment: '商品单位',
    },

    primary_pic_url: {
      type: STRING(255),
      allowNull: false,
      comment: '商品主图',
    },

    list_pic_url: {
      type: STRING(255),
      allowNull: false,
      comment: '商品列表图',
    },

    retail_price: {
      type: DECIMAL(10, 2).UNSIGNED,
      allowNull: false,
      defaultValue: 0,
      comment: '零售价格',
    },

    sell_volume: {
      type: INTEGER(11).UNSIGNED,
      allowNull: false,
      defaultValue: 0,
      comment: '销售量',
    },

    primary_product_id: {
      type: INTEGER(11).UNSIGNED,
      allowNull: false,
      defaultValue: 0,
      comment: '主sku　product_id',
    },

    unit_price: {
      type: DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0,
      comment: '单位价格，单价',
    },

    promotion_desc: {
      type: STRING(255),
      allowNull: false,
      comment: '促销描述',
    },

    promotion_tag: {
      type: STRING(45),
      allowNull: false,
      comment: '促销标签',
    },

    app_exclusive_price: {
      type: DECIMAL(10, 2).UNSIGNED,
      allowNull: false,
      comment: 'APP专享价',
    },

    is_app_exclusive: {
      type: TINYINT(1).UNSIGNED,
      allowNull: false,
      comment: '是否是APP专属',
    },

    is_limited: {
      type: TINYINT(1).UNSIGNED,
      allowNull: false,
      comment: '？？？',
    },

    is_hot: {
      type: TINYINT(1).UNSIGNED,
      allowNull: false,
      defaultValue: 0,
      comment: '是否正在热卖？？？',
    },
  }, {
    charset: 'utf8mb4',
    timestamps: false,
    // 创建索引
    indexes: [
      {
        name: 'goods_sn',
        fields: ['goods_sn'],
      },
      {
        name: 'cat_id',
        fields: ['category_id'],
      },
      {
        name: 'brand_id',
        fields: ['brand_id'],
      },
      {
        name: 'goods_number',
        fields: ['goods_number'],
      },
      {
        name: 'sort_order',
        fields: ['sort_order'],
      },
    ],
  }) as IGoodModel;

  good.getSpecificationList = async (goodsId: number) => {
    // 根据商品id信息，查找规格值列表
    const GoodSpecification = app.model.GoodSpecification;
    const Specification = app.model.Specification;
    const specificationRes = await GoodSpecification.findAll({
      where: { goods_id: goodsId },
      // NOTE: 如果不加raw: true，则include查出来的结果会被包含在include字段中
      raw: true,
      include: [
        {
          association: GoodSpecification.belongsTo(Specification, { foreignKey: 'specification_id', targetKey: 'id' }),
          model: Specification,
          // 内连接
          required: true,
          // NOTE: include查出来的字段会被自动添加上表名变成 nideshop_specifications.name，如果需要去除表名，只能自己对结果进行map修改
          attributes: ['name'],
        },
      ],
    }).then(results => {
      results.forEach(result => {
        // NOTE: 使用model.name 获取的是单数的表名，也就是define的时候定义的表名
        // 使用model.getTableName() 获取的是复数的表名，也就是数据库中实际的表名
        const table = Specification.name;
        result['name'] = result[table + '.name'];
      });
      return results;
    });

    const specificationList = [] as ISpecificationList[];
    const hasSpecificationList = {};
    // 按规格名称分组
    for (const specItem of specificationRes) {
      if (!hasSpecificationList[specItem.specification_id]) {
        specificationList.push({
          specification_id: specItem.specification_id,
          // TODO: 这个地方需要检查数据结构
          name: specItem['name'],
          valueList: [specItem],
        });
        hasSpecificationList[specItem.specification_id] = specItem;
      } else {
        for (const specification of specificationList) {
          if (specification.specification_id === specItem.specification_id) {
            specification.valueList.push(specItem);
            break;
          }
        }
      }
    }

    return specificationList;
  };

  /**
   * @description 根据货物id查找具体商品信息
   * @param {number} goodsId 货物id
   * @returns {PromiseLike<IProductInst[]>} 商品具体列表
   */
  good.getProductList = (goodsId: number) => {
    return app.model.Product.findAll({
      where: { goods_id: goodsId },
    });
  };

  return good;
};
