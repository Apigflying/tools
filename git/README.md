# GIT命令的使用

标签（空格分隔）： GIT

[TOC]

---
1.git remote
**查看当前文件夹(目录)内，配置了那些远程仓库**
它会列出每个远程库的简短名字
```
#克隆完一个项目之后，至少可以看到一个名为：origin的远程库
git clone https://github.com/Apigflying/my_servers_server
cd my_servers_server
git remote
> origin
```

>git remote [shortname] [url]
将本地内容添加到github仓库
1.在github上建立目录
2.在本地文件夹中，打开git bash
git init 
git add .
git commit -m "test"
git remoute add origin https://github.com/Apigflying/wx.git
git push -u origin master


## 1.git config --list
查看已有的git配置信息列表

## 2.初始化文件，将当前目录的文件交由git托管git init
在工作目录中初始化新仓库
初始化之后，当前目录下，会生成一个.git的目录，所有git需要的数据和资源都放在这个目录中

## 3.将文件添加到暂存区git add 
如果当前目录下有几个文件想要纳入版本控制，需要先用git add命令告诉Git开始对这些文件进行跟踪
`git add *`
`git add .`添加目录中的所有文件
`git add [文件名|文件夹名]` 添加一个文件，或者递归将文件夹里面的文件放入暂存区

## 4.git status查看当前文件夹内文件的状态
查看当前文件夹内的文件处于的状态
```
$ git status
On branch master
nothing to commit, working directory clean
```
>这说明你现在的工作目录相当干净。换句话说，所有已跟踪文件在上次提交后都未被更改过。此外，上面的信息还表明，当前目录下没有出现任何处于未跟踪的新文件，否则 Git 会在这里列出来。最后，该命令还显示了当前所在的分支是 master，这是默认的分支名称，实际是可以修改的

---------

- [x] 在add之后，修改文件然后再查看状态
```
$ vim benchmarks.rb
$ git status
On branch master
Changes to be committed:
  (use "git reset HEAD <file>..." to unstage)
        new file:   README
        modified:   benchmarks.rb
        //上面这部分是在暂存区储存的，即已经add过的
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git checkout -- <file>..." to discard changes in working directory)

        modified:   benchmarks.rb
        //下面这部分是修改了文件，但是还没有add到暂存区的
```
**git允许多次add 即：将修改的内容放到暂存区**

---------

## 5.git rm -r [文件名] -- 删除远程文件夹内的文件
1.先删除文件
git rm -r --cached node_modules
2.提交修改到工作区
git commit -m "删除多余的node_modules文件"
3.提交修改
git push
将修改提交到远程origin，将远程github上的文件删除掉
>删除本地记录中的文件
`git rm [options] [filename]`
如果文件已经修改，或者已经add到暂存区了，那么在删除的时候，需要用 -f 来强制删除
git rm -f [文件名]
强制删除（已经在暂存区的文件）

### 5.1删除add之后的文件
`git rm --cached '文件路径(status中的文件路径)'`
执行以上命令之后，再查看status，就不会再有添加后的文件了




## 6.git push时忽略上传的文件夹/文件
>方法1
    vim .gitignore
```
#这个是注释文档，会被git忽略掉
**/node_modules/
#匹配模式最后跟 / 说明要忽略的是目录

*.a  #忽略所有以.a结尾的文件
!lib.a  #但lib.a除外

build/  #忽略build目录及其所有子文件

/todo #仅忽略项目根部录下的todo文件，不包括 src/todo

doc/*.txt  #忽略doc目录下的所有以.txt结尾的文件，但不忽略 doc/abc/b.txt 文件

doc/**/*.txt  #忽略doc目录下所有扩展名为txt的文件，递归忽略

```

## 7.git diff比较还未暂存的文件和已经暂存的文件之间的不同
**无法比较这次工作和上次提交之间的差异**
![diff的使用][1]

## 8.git commit提交到版本或者分支
`git commit -a -m "message"`
>options:
 -a ： 自动将已经跟踪过的文件暂存起来，一起提交，从而跳过git add 的过程
 -m ： 本次提交的修改说明
 
## 9.git checkout 切换分支
 git checkout -b 本地分支名 origin/远程分支名
 使用该方式会在本地创建新分支，并自动切换到该本地分支
 
 git fetch origin 远程分支名:本地分支名
 该方法会在本地新建分支，但是不会切换到该分支，需要手动checkout
 
## 10.git stash 储存状态
git更新版本的时候，需要先将本地的change提交，才能pull远程的
```
git stash #储存当前修改，恢复到上一版本
git pull #拉取远程的修改到本地
git stash pop #删除并合并储存的内容，可能冲突

------------------------------------------------
git add .
git commit 
git push # 提交修改
```
![git stash的应用和原理][2]
 

## 11.git clone
`git clone [url]`
从远程git仓库复制出一份到本地
保存下载下来的所有版本记录，然后从中取出最新版本的文件拷贝
如果希望在克隆的时候，自己定义要新建的项目目录名称，可以在上面的命令末尾指定新的名字：
`git clone git://github...abc.git myGitProjects`
生成一个目录名字为myGitProjects的文件夹，里面放入所有的文件和.git文件

## git 使用中遇到的问题
### 1.mac下提示：Failed to connect to github.com port 443: Connection refused
解决方法：
- 1.进入.ssh文件夹
`cd /User/chenxuanyu/.ssh`
- 2.编辑config文件
`vim config`
```
Host github.com
User 809276596@qq.com #git邮箱
Hostname ssh.github.com
PreferredAuthentications publickey
IdentityFile /Users/chenxuanyu/.ssh/id_rsa #ssh私钥地址
Port 443 #https端口
```
- 3.为config添加权限
`sudo chmod 600 config`

- 4.测试
`ssh -T git@github.com`
>Hi Apigflying! You've successfully authenticated, but GitHub does not provide shell access.

## mac下全局不提交.DS_Store的方法
- 1.添加.gitigonre_gloabl
`vim .gitignore_global`
- 2.添加忽略的文件名
```
.DS_Store
.DS_Store?
```
- 3.在.gitconfig内添加内容
```
[push]
    default = matching

[core]
excludesfile = /Users/chenxuanyu/.gitignore_global
```

[1]: http://osjykr1v3.bkt.clouddn.com/FodhjyrPEOVrxkHM_Kjz5wBcgo0F
  [2]: http://osjykr1v3.bkt.clouddn.com/Fkw5FZAGWjj8MxX-v9kC6acjJ6Bi