<template>
  <div class="contact-container">
      <ul>
          <li class="item">
            <a href="https://github.com/chenyufeng1999">
                <Icon type="github" />
                <span>chenyufeng1999</span>
            </a>
            <div class="pop">
                <img src="https://img2.baidu.com/it/u=3654322319,2496072514&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=501" alt="">
            </div>
          </li>
          <li class="item">
            <a href="tencent://message/?Menu=yes&uin=1626166468&Service=300&sigT=45a1e5847943b64c6ff3990f8a9e644d2b31356cb0b4ac6b24663a3c8dd0f8aa12a595b1714f9d45">
                <Icon type="qq" />
                <span>1626166468</span>
            </a>
            <div class="pop">
                <img src="https://img2.baidu.com/it/u=3654322319,2496072514&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=501" alt="">
            </div>
          </li>
          <li class="item">
            <a href="mailto:1626166468@qq.com">
                <Icon type="mail" />
                <span>1626166468@qq.com</span>
            </a>
            <div class="pop">
                <img src="https://img2.baidu.com/it/u=3654322319,2496072514&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=501" alt="">
            </div>
          </li>
          <li class="item weixin">
            <a href="#">
                <Icon type="weixin" />
                <span>Awsl</span>
            </a>
            <div class="pop">
                <img src="https://img2.baidu.com/it/u=3654322319,2496072514&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=501" alt="">
            </div>
          </li>
      </ul>  
  </div>
</template>

<script>
import Icon from '@/components/Icon'
export default {
    components:{Icon},
    name:'Contact'
}
</script>

<style lang="less" scoped>
@import '~@/styles/var.less';
.contact-container{
    width: 100%;
    ul{
        list-style: none;
        padding: 0;
        margin: 0;
        li{
            position: relative;
            line-height: 30px;
            padding: 0 20px;
            display: flex;
            align-items: center;
            color: @lightWords;
            &.weixin a .icon-container{
                font-size: 22px;
                margin-left: -2px;
            }
            a{
                font-size: 18px;
                span{
                    margin-left: 5px;
                    font-size: 14px;
                }
                &:hover ~ .pop{
                    display: block;
                }
            }
            .pop{
                position: absolute;
                bottom: 35px;
                left: 20px;
                padding: 20px;
                background: #fff;
                border-radius: 5px;
                display: none;
                transition: all 2s;
                transform-origin: center bottom;
                img{
                    width: 120px;
                    height: 120px;
                }
                &::after{
                    content:'';
                    width: 10px;
                    height: 10px;
                    background: #fff;
                    position: absolute;
                    left: 50%;
                    bottom: -5px;
                    transform: translateX(-50%) rotate(45deg);
                }
            }
        }
    }
}
</style>