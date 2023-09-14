#include <errno.h>
#include <string.h>
#include <unistd.h>
#include <netdb.h>
#include <sys/socket.h>
#include <netinet/in.h>
#include <stdlib.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#define buffer 1024
#define MaxClient 128
int StorId[MaxClient];

void initStorId()
{
    for (size_t i = 0; i < MaxClient; i++)
    {
        StorId[i] = -1;
    }
}

void setId(int id, int fd)
{
    StorId[id] = fd;
}

int getId(int fd)
{
    for (size_t i = 0; i < MaxClient; i++)
    {
        if (StorId[i] == fd)
            return i;
    }
    return -1;
}

void removeId(int fd)
{
    for (size_t i = 0; i < MaxClient; i++)
    {
        if (StorId[i] == fd)
            StorId[i] = -1;
    }
}

void fatal()
{
    write(2, "Fatal error\n", strlen("Fatal error\n"));
    exit(1);
}

int main(int ac, char **argv)
{
    int sockfd, connfd, len;
    struct sockaddr_in servaddr, cli;
    fd_set groupRead;
    fd_set copyRread;
    char buff[buffer];
    char tmp[buffer];
    char msg[buffer];
    int maxfd;
    int id;
    int x;
    int y;
    if (ac != 2)
    {
        write(2, "Wrong number of arguments\n", strlen("Wrong number of arguments\n"));
        exit(1);
    }
    sockfd = socket(AF_INET, SOCK_STREAM, 0);
    if (sockfd == -1)
    {
        printf("socket creation failed...\n");
        exit(0);
    }
    else
        printf("Socket successfully created..\n");
    bzero(&servaddr, sizeof(servaddr));
    servaddr.sin_family = AF_INET;
    servaddr.sin_addr.s_addr = htonl(2130706433); // 127.0.0.1
    servaddr.sin_port = htons(atoi(argv[1]));
    if ((bind(sockfd, (const struct sockaddr *)&servaddr, sizeof(servaddr))) != 0)
    {
        printf("socket bind failed...\n");
        exit(0);
    }
    else
        printf("Socket successfully binded..\n");
    if (listen(sockfd, 10) != 0)
    {
        printf("cannot listen\n");
        exit(0);
    }
    FD_ZERO(&groupRead);
    FD_ZERO(&copyRread);
    FD_SET(sockfd, &groupRead);
    maxfd = sockfd;
    id = 0;
    while (1)
    {
        copyRread = groupRead;
        int ret = select(maxfd + 1, &copyRread, NULL, NULL, NULL);
        for (int fd = 0; fd <= maxfd; fd++)
        {
            if (FD_ISSET(fd, &copyRread))
            {
                if (fd == sockfd)
                {
                    int newClient = accept(sockfd, NULL, NULL);
                    bzero(msg, buffer);
                    sprintf(msg, "server: client %d just arrived\n", id);
                    for (int _fd = 0; _fd <= maxfd; _fd++)
                    {
                        if (_fd != newClient)
                            send(_fd, msg, strlen(msg), 0);
                    }
                    setId(id, newClient);
                    FD_SET(newClient, &groupRead);
                    if (newClient > maxfd)
                        maxfd = newClient;
                    id++;
                }
                else
                {
                    bzero(buff, buffer);
                    int data = recv(fd, buff, buffer, 0);
                    if (data <= 0)
                    {
                        bzero(msg, buffer);
                        sprintf(msg, "server: client %d just left\n", getId(fd));
                        for (int _fd = 0; _fd <= maxfd; _fd++)
                        {
                            if (_fd != fd)
                                send(_fd, msg, strlen(msg), 0);
                        }
                        removeId(fd);
                        FD_CLR(fd, &groupRead);
                        close(fd);
                    }
                    else
                    {
                        x = 0;
                        y = 0;
                        while (buff[x])
                        {
                            tmp[y] = buff[x];
                            if (buff[x] == '\n')
                            {
                                tmp[y + 1] = '\0';
                                bzero(msg, buffer);
                                sprintf(msg, "client %d: %s", getId(fd), tmp);
                                for (int _fd = 0; _fd <= maxfd; _fd++)
                                {
                                    if (_fd != fd)
                                        send(_fd, msg, strlen(msg), 0);
                                }
                                y = -1;
                            }
                            y++;
                            x++;
                        }
                    }
                }
            }
        }
    }
}