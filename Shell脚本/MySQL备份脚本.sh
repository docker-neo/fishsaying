#!/bin/bash
#author zhoutimo 2017.6.12
#mysql backup&restore script

back_dir=/data/mysql_backup
logfile=/data/log/mysql_backup/mysql_backup_restore.log
date=$(date +%Y%m%d)
schema_file_name=db_content.online.$date.schema.sql
data_file_name=db_content.online.$date.data.sql

db_host_online=XX
#链接数据库地址
db_online=XX
#链接数据库名称
db_user_online=XX
#链接数据库账号
db_passwd_online=XX
#链接数据库密码


#online database backup

if [ ! -d $back_dir ] ;
then
mkdir -p $back_dir
fi

cd $back_dir
mysqldump -h$db_host_online -u$db_user_online -p$db_passwd_online -d $db_online\
 --ignore-table=$db_online.proprietary_listen_log\
 --ignore-table=$db_online.oss_trance_log\
 --ignore-table=$db_online.voice_listen_log\
 --ignore-table=$db_online.territory_listen_log\
 --ignore-table=$db_online.sys_menu\
 --ignore-table=$db_online.sys_user > $schema_file_name

if [[ $? == 0 ]];
then
    echo "$(date "+%Y-%m-%d %H:%M:%S") $schema_file_name backup successful!" >> $logfile
fi

mysqldump -h$db_host_online -u$db_user_online -p$db_passwd_online -t $db_online\
 --ignore-table=$db_online.proprietary_listen_log\
 --ignore-table=$db_online.oss_trance_log\
 --ignore-table=$db_online.voice_listen_log\
 --ignore-table=$db_online.territory_listen_log\
 --ignore-table=$db_online.sys_menu\
 --ignore-table=$db_online.sys_user > $data_file_name

if [[ $? == 0 ]];
then
    echo "$(date "+%Y-%m-%d %H:%M:%S") $data_file_name backup successful!" >> $logfile
fi

#恢复数据库
#restore db_content
#mysql -h$db_host_online -u$db_user_online -p$db_passwd_online $db_online < $schema_file_name
#mysql -h$db_host_online -u$db_user_online -p$db_passwd_online $db_online < $data_file_name

#删除前3天的保持数据
find /data/mysql_backup/ -type f -mtime +3 -name '*.sql' |xargs rm -f > /dev/null 2>&1;
