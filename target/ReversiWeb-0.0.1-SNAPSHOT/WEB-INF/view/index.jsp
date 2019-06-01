<%@ page language="java" contentType="text/html; charset=ISO-8859-1" pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
		<title>Reversi</title>
		
		<style>
			html, body {
			   margin: 0;
			   padding: 0;
			}
			
			.game {
			    width: 100%;
			    height:100px;
			    position: fixed; 
			    text-align: center;
			}
			
		</style>
		
	</head>
	<body>
	
		<div class="game">
			<canvas id="reversi"></canvas>
		</div> 
		
		<script type="text/javascript" src="${pageContext.request.contextPath}/js/jquery-3.2.0.min.js"></script>
		<script type="text/javascript" src="${pageContext.request.contextPath}/js/reversi.js"></script>
		
	</body>
</html>