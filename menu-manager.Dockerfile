FROM mcr.microsoft.com/dotnet/core/sdk:5 AS build-env
WORKDIR /app
#EXPOSE 80

COPY ./MenuManagerWebAPI ./
RUN dotnet restore
RUN dotnet publish "MenuManagerWebAPI.csproj" -c Release -o out

# Build runtime image
FROM mcr.microsoft.com/dotnet/core/aspnet:5.0
WORKDIR /app

COPY --from=build-env /app/out .
#ENTRYPOINT ["dotnet", "MenuManagerWebAPI.dll"]
CMD ASPNETCORE_URLS=http://*:$PORT dotnet MenuManagerWebAPI.dll