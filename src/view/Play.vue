//示例代码
<template>
  <div id="tree">
    <div class="container">
      <div class="col-md-10 col-md-offset-1">
        <div class="page-header">
          <h3>招行度量指标体系</h3>
        </div>
        <div class="row">
          <div class="col-md-8 col-md-offset-2">
            <form class="form-horizontal row">
              <div class="col-md-4">
                <div class="checkbox">
                  <label>
                    <input type="checkbox" v-model="horizontal" /> 横排
                  </label>
                </div>
              </div>
              <div class="col-md-4">
                <div class="checkbox">
                  <label>
                    <input type="checkbox" v-model="collapsable" /> 竖排
                  </label>
                </div>
              </div>
              <div class="col-md-4">
                <div class="checkbox">
                  <label>
                    <input type="checkbox" v-model="expandAll" @change="expandChange" /> 显示所有项
                  </label>
                </div>
              </div>
              <p>
                <br />
              </p>
              <p>
                <br />
              </p>
              <div class="col-md-6">
                <div class="form-group">
                  <label class="control-label col-md-5">背景色选择:</label>
                  <div class="col-md-7">
                    <select class="form-control" v-model="labelClassName">
                      <option value="bg-white">bg-white</option>
                      <option value="bg-orange">bg-orange</option>
                      <option value="bg-gold">bg-gold</option>
                      <option value="bg-gray">bg-gray</option>
                      <option value="bg-lightpink">bg-lightpink</option>
                      <option value="bg-chocolate">bg-chocolate</option>
                      <option value="bg-tomato">bg-tomato</option>
                    </select>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
        <p>
          <br />
        </p>
        <div class="editor-box">
          <Editor  ref="kindeditor" :html="html" @input="getContent"></Editor>
        </div>
        <div class="text-center">
          <vue2-org-tree
            :data="data"
            :horizontal="horizontal"
          />
          <vue2-org-tree
            name="test"
            :data="data"
            :horizontal="horizontal"
            :collapsable="collapsable"
            :label-class-name="labelClassName"
            :render-content="renderContent"
            @on-expand="onExpand"
            @on-node-click="onNodeClick"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Editor from '@/components/editor'

export default {
  components: { Editor },
  data() {
    return {
      data: {
        id: 0,
        label: "度量指标体系",
        children: [
          {
            id: 1,
            label: "交付质量",
            children: [
              {
                id: 11,
                label: "生产质量",
                children: [
                  {
                    id: 111,
                    label: "生产事件"
                  }
                ]
              },
              {
                id: 12,
                label: "开发质量",
                children: [
                  {
                    id: 121,
                    label: "项目开发缺陷密度"
                  }
                ]
              },
              {
                id: 13,
                label: "发布质量",
                children: [
                  {
                    id: 131,
                    label: "上线失败率"
                  }
                ]
              },
              {
                id: 14,
                label: "过程质量",
                children: [
                  {
                    id: 141,
                    label: "项目过程符合度"
                  }
                ]
              }
            ]
          },
          {
            id: 2,
            label: "交付效能",
            children: [
              {
                id: 21,
                label: "交付能力",
                children: [
                  {
                    id: 211,
                    label: "功能点产出"
                  },
                  {
                    id: 212,
                    label: "代码行产出"
                  },
                  {
                    id: 213,
                    label: "上线投产次数"
                  },
                  {
                    id: 214,
                    label: "接收需求数"
                  },
                  {
                    id: 215,
                    label: "立项数"
                  },
                  {
                    id: 216,
                    label: "结项数"
                  },
                  {
                    id: 217,
                    label: "迭代速率"
                  },
                  {
                    id: 218,
                    label: "迭代完成率"
                  }
                ]
              },
              {
                id: 22,
                label: "交付效率",
                children: [
                  {
                    id: 221,
                    label: "人均产出功能点"
                  },
                  {
                    id: 222,
                    label: "项目生产率"
                  }
                ]
              }
            ]
          },
          {
            id: 3,
            label: "业务满意度",
            children: [
              {
                id: 31,
                label: "业务满意度"
              }
            ]
          },
          {
            id: 4,
            label: "交付价值",
            children: [
              {
                id: 41,
                label: "业务价值关键指标"
              }
            ]
          },
          {
            id: 5,
            label: "交付速度",
            children: [
              {
                id: 51,
                label: "需求评估速度",
                children: [
                  {
                    id: 511,
                    label: "需求响应度"
                  }
                ]
              },
              {
                id: 52,
                label: "开发速度",
                children: [
                  {
                    id: 521,
                    label: "完成度天数"
                  },
                  {
                    id: 522,
                    label: "完成度达标率"
                  },
                  {
                    id: 523,
                    label: "故事平均测试通过周期"
                  }
                ]
              },
              {
                id: 53,
                label: "发布速度",
                children: [
                  {
                    id: 531,
                    label: "首次交付天数"
                  },
                  {
                    id: 532,
                    label: "首次交付达标率"
                  },
                  {
                    id: 533,
                    label: "故事平均发布周期"
                  }
                ]
              },
              {
                id: 54,
                label: "燃尽图"
              },
              {
                id: 55,
                label: "一次测试通过率"
              }
            ]
          },
          {
            id: 6,
            label: "持续交付",
            children: [
              {
                id: 61,
                label: "技术债务率",
                url: "https://world.taobao.com/"
              },
              {
                id: 62,
                label: "DEVOPS成熟度",
                url: " http://www.baidu.com"
              },
              {
                id: 63,
                label: "DEVOPS健康度",
                url: " https://www.google.com/"
              }
            ]
          }
        ]
      },
      horizontal: true,
      collapsable: true,
      expandAll: false,
      labelClassName: "bg-white",
      html: 'https://ebusiness-1255313385.cosbj.myqcloud.com/image/20190823/center2019082304054532.html',
      content:'',
    };
  },
  methods: {
    // 获取编辑器内容
    getContent(content) {
      this.content = content
      // console.log('content', content)
      console.log('content', JSON.stringify(content, null, 2))
    },
    // 编辑器内容转换成在线url
    async getcontent2Url() {
      try {
        const htmlUrl =  await this.$refs.kindeditor.content2Url()
        return htmlUrl
      } catch (error) {
        console.log(error)
      }
    },

    renderContent(h, data) {
      return data.label;
    },
    onExpand(e, data) {
      if ("expand" in data) {
        data.expand = !data.expand;
        if (!data.expand && data.children) {
          this.collapse(data.children);
        }
      } else {
        this.$set(data, "expand", true);
      }
    },
    //点击选项执行的方法，可以用于跳转到其他链接，注意一定要写协议头
    onNodeClick(e, data) {
       //console.log(data.label);
       if(data.url==null){
        return false
      }else{
        window.open(data.url)
      }
    },
    collapse(list) {
      var _this = this;
      list.forEach(function(child) {
        if (child.expand) {
          child.expand = false;
        }
        child.children && _this.collapse(child.children);
      });
    },
    expandChange() {
      this.toggleExpand(this.data, this.expandAll);
    },
    toggleExpand(data, val) {
      var _this = this;
      if (Array.isArray(data)) {
        data.forEach(function(item) {
          _this.$set(item, "expand", val);
          if (item.children) {
            _this.toggleExpand(item.children, val);
          }
        });
      } else {
        this.$set(data, "expand", val);
        if (data.children) {
          _this.toggleExpand(data.children, val);
        }
      }
    }
  }
};
</script>
<style lang="less">
.org-tree-node {
  &:only-child:before {
    top: 0 !important; // 解决只有一个字节点时，连接线凹凸问题
  }
}
.org-tree-node-label {
  white-space: nowrap;
}
.bg-white {
  background-color: white;
}
.bg-orange {
  background-color: orange;
}
.bg-gold {
  background-color: gold;
}
.bg-gray {
  background-color: gray;
}
.bg-lightpink {
  background-color: lightpink;
}
.bg-chocolate {
  background-color: chocolate;
}
.bg-tomato {
  background-color: tomato;
}
</style>


