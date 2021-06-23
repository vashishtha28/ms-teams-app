package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	"github.com/gorilla/mux"
)

type ZdevAccessReq struct {
	UserEmailId string `json:"userEmailId"`
	SshKey      string `json:"sshKey"`
	SideNote    string `json:"sideNote"`
}
type ZdevAccessRes struct {
	UserEmailId string `json:"userEmailId"`
	SshKey      string `json:"sshKey"`
	SideNote    string `json:"sideNote"`
	Message     string `json:"message"`
}

func setupCORS(w *http.ResponseWriter, req *http.Request) {
	(*w).Header().Set("Access-Control-Allow-Origin", "*")
	(*w).Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
	(*w).Header().Set("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization")
}

func home(w http.ResponseWriter, req *http.Request) {
	fmt.Fprintf(w, "Endpoint hit: /home")
	fmt.Fprintf(w, "The GO server is up and running.")
}
func hello(w http.ResponseWriter, req *http.Request) {
	fmt.Fprintf(w, "Endopoint hit: /hello")
}
func zdevAccess(w http.ResponseWriter, req *http.Request) {
	//headers
	setupCORS(&w, req)
	if (*req).Method == "OPTIONS" {
		return
	}
	//retrieve data from req
	var userRequest ZdevAccessReq
	err := json.NewDecoder(req.Body).Decode(&userRequest)
	if err != nil {
		http.Error(w, err.Error(), 400)
		return
	}
	//time.Sleep(10 * time.Second)
	response := ZdevAccessRes{
		UserEmailId: userRequest.UserEmailId,
		SshKey:      userRequest.SshKey,
		SideNote:    userRequest.SideNote,
		Message:     "Done",
	}
	json.NewEncoder(w).Encode(response)
}
func handleRequests() {
	myRouter := mux.NewRouter().StrictSlash(true)

	//Routes ->
	myRouter.HandleFunc("/", home)
	myRouter.HandleFunc("/hello", hello)
	myRouter.HandleFunc("/req/zdev", zdevAccess)

	log.Fatal(http.ListenAndServe(":8000", myRouter))
}

func main() {
	handleRequests()
}
